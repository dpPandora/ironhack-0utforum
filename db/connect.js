const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1/projTwoForum'

mongoose
    .connect(mongoURL)
    .then(x => console.log('Connected to database', x.connections[0].name))
    .catch(err => console.log(err));