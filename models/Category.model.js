const {model, Schema} = require('mongoose');

const catSchema = new Schema({
    topic: {
        type: String
    },
    categoryName: {
        type: String
    }
});

module.exports = model('CategoryM', catSchema);