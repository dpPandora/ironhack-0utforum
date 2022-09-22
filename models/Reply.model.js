const {Schema, model} = require('mongoose');
const moment = require('moment');

const replySchema = new Schema({
    username: String,
    creationDate: {
        type: String,
        default: moment().format('MM-DD-YY, kk:mm:ss')
    },
    age: {
        type: Date,
        default: Date.now
    },
    content: String
});

const ReplyM = model('ReplyM', replySchema);

module.exports = ReplyM;