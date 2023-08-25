var express = require('express');
var router = express.Router();
const { Messages, Users } = require("./Schema")

router.post('/sidebar', async (req, res) => {
    const { email, jump } = req.body
    try {
        const elementNumber = 10;
        const messageDb = await Messages.findOne({ email });

        if (!messageDb) {
            return res.json({ success: false, message: 'User not found' });
        }


        const result = await Messages.aggregate([
            { $match: { email } },
            { $unwind: "$conversations" },
            { $sort: { "conversations.messages.date": -1 } },
            { $group: { _id: "$_id", conversations: { $push: "$conversations" } } },
            { $project: { conversations: { $slice: ["$conversations", jump, elementNumber] } } }
        ]);

        const side = result[0].conversations.map((conversation) => ({
            username: conversation.username || '',
            lastMsg: conversation.messages[0]?.message || '',
            lastYou: conversation.messages[0]?.email === email,
            date: conversation.messages[0]?.date || 0,
            seen: conversation.seen || false,
            avatar: conversation.avatar || '',
            email: conversation.email || ''
        }));
        res.json({ success: true, side: side });
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
})

router.post(`/messages`, async (req, res) => {
    const { email, secondEmail } = req.body
    try {
        const messagesDb = await Messages.findOne({ email })
        if (!messagesDb) {
            return res.json({ success: false, message: 'User not found' });
        }
        const messages = messagesDb?.conversations?.find(conversation => {
            return conversation.email === secondEmail;
        });
        if (messages) {
            res.json({ success: true, messages: messages.messages || [], avatar: messages.avatar || '', username: messages.username || '' })
        } else {
            const userDb = await Users.findOne({ email: secondEmail })
            if (userDb) res.json({ success: true, messages: [], avatar: userDb.avatar || '', username: userDb.name })
            else res.json({ success: false, message: 'User don\'t exist' })
        }
    } catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
})

module.exports = router;
