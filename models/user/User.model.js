const {Schema, model} = require('mongoose');
const moment = require('moment');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'A username is required!'],
        unique: [true, '{VALUE} is already taken.'],
        minLength: [3, 'Username must be longer!']
    },
    creationDate: {
        type: String,
        default: moment().format("MM-DD-YY")
    },
    password: {
        type: String,
        required: [true, 'A password is required! If you did give one then this is probably a server-side issue']
    },
    email: {
        type: String
    },
    tagline: {
        type: String,
        default: "Hello! I'm new!"
    },
    bio: {
        type: String
    }
    //TODO add posts, replies, and bio
});

const UserM = model('UserM', userSchema);

module.exports = UserM;