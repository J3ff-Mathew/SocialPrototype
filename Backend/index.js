const express = require("express");
const cors = require('cors');
const io = require("socket.io")(7001, {
    cors: {
        origin: ['http://localhost:3000']
    }
});
const mongoose = require('mongoose');

const connectDB = require("./Mongoose/connect");
const userModel = require("./Schemas/UserSchema");
const postModel = require("./Schemas/PostSchema")
const PORT = 7000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDB();

app.post('/adduser', async (req, res) => {
    let data = req.body;
    console.log(data)
    let insert = new userModel(data);
    insert.save((err) => {
        if (err) {

            res.send({ error: "Email Already Exists in database" });
        }
        else
            res.status(201).send({ error: "" });
    });
});

app.get('/getuser/:user/:password', async (req, res) => {
    const userid = req.params.user;
    const password = req.params.password;
    let data = await userModel.findOne({ userid: userid, password: password }).select({ name: 1, userid: 1, _id: 0 });
    console.log(data)
    if (data == null) {
        res.send({ error: 'Enter valid Credentials' })
    }
    else
        res.send({ local: data, error: '' })
})

io.on('connection', async (socket) => {

    socket.on('addpost', async (data) => {
        console.log(data)
        let insert = await new postModel({ username: data.username, userid: data.userid, title: data.title, body: data.body, comments: [] });
        await insert.save();
        let post = await postModel.find({});
        io.emit('sendpost', post);
    })

    socket.on('getpost', async () => {
        let post = await postModel.find({});
        socket.emit('sendpost', post);
    });

    socket.on('comment', async (data) => {
        // console.log(data)
        await postModel.updateOne({ _id: data.id }, { $push: { comments: { name: data.name, userid: data.userid, comment: data.comment } } });
        let post = await postModel.find({});
        io.emit('sendpost', post);
        postModel.find({ _id: data.id }, (err, data) => {
            console.log(data)
            let cdata = { comments: data[0].comments, id: data[0]._id }
            // console.log(cpost)
            console.log(cdata)
            io.emit('getcomment', cdata)
        });
    })

});

app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log(`Working on PORT ${PORT}`)
    }
})