import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import passport from 'passport'
import './services/passport'
// const passport = require('passport');

var path = require('path');



const port = 1000;
const app = express();

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'public'));
app.set("view engine", "ejs");

const server = http.createServer(app)
const io = socketIO(server)




server.listen(port, () => {
    console.log("server is runing on port 3000")
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/javascript', (req, res) => {
    res.render('javascript', { room: "Data Science" })
})

app.get('/swift', (req, res) => {
    res.render('swift', { room: "Machine Learning" })
});

app.get('/css', (req, res) => {
    res.render('room', { room: "Web Programming" })
});

// tech namespace
const tech = io.of('/tech')

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        console.log("room ", data.room)
        socket.join(data.room)
            // tech.in(data.room).emit('message', 'New user joined ' + data.room + ' room!')
    })

    socket.on('message', (data) => {
        console.log("data ", data.msg, " ", data.room)
        tech.in(data.room).emit('message', data.msg)
    })

    // socket.on('disconnect', () => {
    //     console.log("user disconnected")
    //     tech.emit('message', 'user disconnected')
    // })
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