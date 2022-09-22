const {Schema, model} = require('mongoose');

const replySchema = new Schema({
    userID: String,
    creationDate: {
        type: Date,
        default: Date.now
    },
    content: String
});

const ReplyM = model('ReplyM', replySchema);

module.exports = ReplyM;