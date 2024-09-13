var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');
const { S3 } = require('aws-sdk');

const upload = multer({ dest: 'uploads/' });


const { Messages } = require("./Schema")



const s3 = new S3({
    region: 'eu-west-3',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

router.post('/upload-photo', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No photo provided' });
    }

    const photoPath = req.file.path;
    console.log(photoPath)
    const stream = fs.createReadStream(photoPath);

    const params = {
        Bucket: 'chatapp2834',
        Key: `uploads/${req.file.originalname}${Math.random()}`,
        Body: stream,
    };

    try {
        const uploaded = await s3.upload(params).promise();
        const photoUrl = uploaded.Location;

        res.status(200).send({ success: true, url: photoUrl });
    } catch (error) {
        console.error('Error uploading to S3:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    } finally {
        fs.unlink(photoPath, (err) => {
            if (err) {
                console.error('Error deleting temporary file:', err);
            }
        });
    }
});



router.post("/sidebar", async (req, res) => {

    const { email = null, usersToSkip = null } = req.body

    try {

        if (email == null || usersToSkip == null) {
            return res.json({
                success: false,
                message: "Invalid request data"
            })
        }

        const elementNumber = 20;
        const messageDb = await Messages.findOne({ email });
        if (!messageDb) {
            return res.json({
                success: false,
                message: 'User not found',
            });
        }

        const result = await Messages.aggregate([
            { $match: { email } },
            { $unwind: '$conversations' },
            { $sort: { 'conversations.messages.date': -1 } },
            { $group: { _id: '$_id', conversations: { $push: '$conversations' } } },
            { $project: { conversations: { $slice: ['$conversations', usersToSkip, elementNumber] } } },
        ]);

        console.log(result);

        const side = result[0]?.conversations?.map((conversation) => {
            const last = conversation.messages.length - 1;
            return {
                username: conversation.username || '',
                lastMsg: conversation.messages[last]?.message || '',
                lastYou: conversation.messages[last]?.email === email,
                date: conversation.messages[last]?.date || '0',
                seen: conversation.seen || false,
                avatar: conversation.avatar || '',
                email: conversation.email || '',
            };
        });

        const totalConversations = messageDb.conversations.length;
        const hasMoreData = usersToSkip + elementNumber < totalConversations;

        return res.json({
            success: true, sidebar: side || [], hasMoreData
        })
    } catch (e) {
        return res.json({ success: false, error: e.message })
    }
})


router.post("/messages", async (req, res) => {
    const { email = null, secondEmail = null, jump = null } = req.body;

    try {

        if (email == null || secondEmail == null || jump == null) {
            return res.json({ success: false, message: "Wrong information provided." })
        }
        const elementNumber = 50;
        const messagesDb = await Messages.findOne({ email });
        if (!messagesDb) {
            return res.json({
                success: false,
                message: 'User not found',
            })
        }
        const messages = messagesDb?.conversations?.find(conversation => {
            return conversation.email === secondEmail;
        });
        if (messages) {
            const nextMessages = await Messages.aggregate([
                { $match: { email } },
                { $unwind: '$conversations' },
                { $match: { 'conversations.email': secondEmail } },
                {
                    $project: {
                        _id: 0,
                        messages: '$conversations.messages',
                        avatar: '$conversations.avatar',
                        username: '$conversations.username',
                        seen: '$conversations.seen',
                        bg: '$conversations.bg'
                    }
                },
                { $limit: 1 },
                {
                    $project: {
                        messages: {
                            $slice: [
                                { $reverseArray: '$messages' },
                                jump,
                                elementNumber
                            ]
                        },
                        avatar: 1,
                        username: 1,
                        seen: 1,
                        bg: 1,
                    }
                }
            ]);
            if (nextMessages.length > 0) {
                const reversedMessages = nextMessages[0].messages;
                const hasMoreData = reversedMessages.length === elementNumber ? true : false
                return res.json({
                    success: true,
                    messages: reversedMessages || [],
                    avatar: nextMessages[0].avatar || '',
                    username: nextMessages[0].username || '',
                    hasMoreData: hasMoreData,
                    seen: nextMessages[0].seen || false,
                    bg: nextMessages[0].bg || ''
                })
            } else {
                return res.json({
                    success: false,
                    message: 'Conversation not found'
                })
            }
        } else {
            const userDb = await Users.findOne({ email: secondEmail });
            if (userDb) {
                return res.json({
                    success: true,
                    messages: [],
                    avatar: userDb.avatar || '',
                    username: userDb.username,
                    hasMoreData: false,
                    seen: false,
                    bg: 'https://chatapp2834.s3.eu-west-3.amazonaws.com/p1.jpg'
                })
            } else {
                return res.json({
                    success: false,
                    message: "User don't exist"
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: err.message })
    }
})



module.exports = router;
