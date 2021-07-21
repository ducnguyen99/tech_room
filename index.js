import express from 'express'
import http from 'http'
import socketIO from 'socket.io'


const port = 3000;
const app = express();
const server = http.createServer(app)
const io = socketIO(server)

server.listen(port, () => {
    console.log("server is runing on port 3000")
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html')
})

app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});

// tech namespace
const tech = io.of('/tech')

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        console.log("room ", data.room)
        socket.join(data.room)
        tech.in(data.room).emit('message', 'New user joined ' + data.room + ' room!')
    })

    socket.on('message', (data) => {
        console.log("data ", data.msg, " ", data.room)
        tech.in(data.room).emit('message', data.msg)
    })

    socket.on('disconnect', () => {
        console.log("user disconnected")
        tech.emit('message', 'user disconnected')
    })
})


// tech namespace
// const tech = io.of('/tech');

// tech.on('connection', (socket) => {
//     socket.on('join', (data) => {
//         socket.join(data.room);
//         tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
//     })

//     socket.on('message', (data) => {
//         console.log(`message: ${data.msg}`);
//         tech.in(data.room).emit('message', data.msg);
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');

//         tech.emit('message', 'user disconnected');
//     })
// })