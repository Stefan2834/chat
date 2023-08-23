var express = require('express');
var router = express.Router();
const { Messages, Users } = require("./Schema")

router.post('/sidebar', async (req, res) => {
    const { email } = req.body
    try {
        const messageDb = await Messages.findOne({ email })
        if (!messageDb) {
            return res.json({ success: false, message: 'User not found' });
        }
        const side = messageDb.conversations.map((conversation) => {
            const lastMessageIndex = conversation.messages.length - 1;
            const lastMessage = conversation.messages[lastMessageIndex] || {};
            return {
                username: conversation.username || '',
                lastMsg: lastMessage.message || '',
                lastYou: lastMessage.email === email,
                date: lastMessage.date || 0,
                seen: conversation.seen || false,
                avatar: conversation.avatar || '',
                email: conversation.email || ''
            };
        });
        side.sort((a, b) => b.date - a.date);
        res.json({ success: true, side: side })
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
