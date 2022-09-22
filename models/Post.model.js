const {Schema, model} = require('mongoose');
const moment = require('moment'); // require
moment().format("MM-DD-YY"); 

const postSchema = new Schema({
    category: String,
    username: String,
    title: String,
    creationDate: {
        type: String,
        default: moment().format("MM-DD-YY, kk:mm:ss")
    },
    content: String,
    replies: [{type: Schema.Types.ObjectId, ref:'ReplyM'}]
});

const PostM = model('PostM', postSchema);

module.exports = PostM;