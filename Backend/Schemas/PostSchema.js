const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    username: { type: String, required: true },
    userid: { type: String, required: true },
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    body: { type: String, required: true },
    comments: [
        {
            name: { type: String },
            userid: { type: String },
            comment: { type: String },
            date: { type: Date, default: Date.now }
        }
    ]
});
module.exports = mongoose.model('posts', PostSchema)