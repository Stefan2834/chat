const { Messages } = require('../routes/Schema.js');

const handleSocketMessage = async (data) => {
    try {
        let message = {
            email: data.emailSend,
            date: data.date,
            message: data.message,
        }
        message = data.photo ? { ...message, photo: data.photo } : message
        const userSend = await Messages.exists({
            email: data.emailSend,
            'conversations.email': data.emailReceive,
        });
        if (userSend) {
            await Messages.updateOne(
                { email: data.emailSend, 'conversations.email': data.emailReceive },
                {
                    $push: { 'conversations.$.messages': message },
                    $set: { 'conversations.$.seen': false }
                }
            );
        } else {
            const newSendConversation = {
                email: data.emailReceive,
                username: data.userReceive,
                seen: false,
                avatar: data.avatarReceive,
                bg: 'https://chatapp2834.s3.eu-west-3.amazonaws.com/p1.jpg',
                messages: [message],
            }
            await Messages.updateOne(
                { email: data.emailSend },
                { $push: { conversations: newSendConversation } }
            );
        }


        const userReceiveExist = await Messages.exists({
            email: data.emailReceive,
            'conversations.email': data.emailSend,
        });
        if (userReceiveExist) {
            await Messages.updateOne(
                { email: data.emailReceive, 'conversations.email': data.emailSend },
                {
                    $push: { 'conversations.$.messages': message },
                    $set: { 'conversations.$.seen': false }
                }
            );
        } else {
            const newReceiverConversation = {
                email: data.emailSend,
                username: data.userSend,
                seen: false,
                avatar: data.avatarSend,
                bg: 'https://chatapp2834.s3.eu-west-3.amazonaws.com/p1.jpg',
                messages: [message],
            }
            await Messages.updateOne(
                { email: data.emailReceive },
                { $push: { conversations: newReceiverConversation } }
            );
        }
        console.log(`Message sent in room: ${data.room}`);
        io.to(data.room).emit('message', { success: true, message: message, photo: message?.photo });
        const sideReceive = {
            username: data?.userSend || '',
            lastMsg: data?.message || '',
            date: data?.date || 0,
            avatar: data.avatarSend || '',
            email: data.emailSend || ''
        };
        const sideSend = {
            username: data?.userReceive || '',
            lastMsg: data?.message || '',
            date: data?.date || 0,
            avatar: data.avatarReceive || '',
            email: data.emailReceive || ''
        };
        io.to(`side-${data?.emailReceive}`).emit('notification', { success: true, message: message, avatar: data.avatarSend });
        io.to(`side-${data?.emailReceive}`).emit('changeSide', { success: true, side: sideReceive, sender: data.emailSend })
        io.to(`side-${data?.emailSend}`).emit('changeSide', { success: true, side: sideSend, sender: data.emailSend })
    } catch (err) {
        console.log(err)
        io.to(data?.room).emit('message', { success: false, message: err.message })
        io.to(`side-${data?.emailReceive}`).emit('notification', { success: true, message: err.message });
        io.to(`side-${data?.emailSend}`).emit('changeSide', { success: false, message: err.message })
        io.to(`side-${data?.emailReceive}`).emit('changeSide', { success: false, message: err.message })
    }
}


const handleSocketSeen = async (data) => {
    try {
        const messageSend = await Messages.findOne({ email: data.emailSend });
        const messageReceive = await Messages.findOne({ email: data.emailReceive })
        if (!messageSend || !messageReceive) {
            return io.to(data?.room).emit('seen', { success: false })
        }
        const conversationSendIndex = messageSend.conversations?.findIndex(conversation => conversation.email === data.emailReceive);
        const conversationReceiveIndex = messageReceive.conversations?.findIndex(conversation => conversation.email === data.emailSend);
        if (conversationSendIndex !== -1 || conversationReceiveIndex !== 1) {
            const updateSend = {
                $set: {
                    [`conversations.${conversationSendIndex}.seen`]: true
                }
            };
            const updateReceive = {
                $set: {
                    [`conversations.${conversationReceiveIndex}.seen`]: true
                }
            }
            await Messages.updateOne({ email: data.emailSend }, updateSend);
            await Messages.updateOne({ email: data.emailReceive }, updateReceive);
            io.to(data?.room).emit('seen', { success: true, })
            io.to(`side-${data?.emailSend}`).emit('sideSeen', { success: true, email: data.emailReceive })
            io.to(`side-${data?.emailReceive}`).emit('sideSeen', { success: true, email: data.emailSend })
        }
    } catch (err) {
        console.log(err)
    }
}


module.exports = { handleSocketMessage, handleSocketSeen }