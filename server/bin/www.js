var app = require('../app');
var debug = require('debug')('server:server');
var http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose')
require('dotenv').config();

const { Messages } = require('../routes/Schema.js');

const { handleSocketMessage, handleSocketSeen } = require('../functions/socket.js')


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: process.env.WEBSITE }
});




io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (room) => {
        socket.room = room.room;
        socket.join(room.room);
        console.log(`User joined room: ${room.room}`);
    });
    socket.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    socket.on('leave', (room) => {
        socket.room = room.room
        socket.leave(room.room)
        console.log(`A user disconnected room: ${room.room}`)
    })

    socket.on('message', async (data) => {
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
            console.log(data.userSend);
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
            console.log(data?.userSend);
            io.to(`side-${data?.emailReceive}`).emit('notification', { success: true, message: message, avatar: data.avatarSend });
            io.to(`side-${data?.emailReceive}`).emit('changeSide', { success: true, side: sideReceive, sender: data.emailSend })
            io.to(`side-${data?.emailSend}`).emit('changeSide', { success: true, side: sideSend, sender: data.emailSend })
        } catch (err) {
            console.log(err)
            io.to(data?.room).emit('message', { success: false, message: err.message })
            io.to(`side-${data?.emailReceive}`).emit('notification', { success: false, message: err.message });
            io.to(`side-${data?.emailSend}`).emit('changeSide', { success: false, message: err.message })
            io.to(`side-${data?.emailReceive}`).emit('changeSide', { success: false, message: err.message })
        }
    });

    socket.on('seen', async (data) => {
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
    })

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });
});


const connect = async () => {
    await mongoose.connect(process.env.MONGOOSE_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(data => {
        console.log("Connected to MongoDB");
    }).catch(err => console.error("Error connecting to MongoDB:", err))
}
var port = normalizePort(process.env.PORT || '9000');
app.set('port', port);

server.listen(port,
    async () => {
        await connect()
        console.log(`Server is on port: ${port}`)
    });
server.on('error', onError);
server.on('listening', onListening);



function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


module.exports = io