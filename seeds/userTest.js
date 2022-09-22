const mongoose = require('mongoose');
const UserM = require('../models/user/User.model');

const testUsers = [
    {
        username: "testUser1",
        password: "aksjr;gvnerv"
    },
    {
        username: "testUser2",
        password: "iwDFVNAWERVN"
    },
    {
        username: "testUser3",
        password: "eravunnawsv"
    }
]

mongoose
    .connect('mongodb://127.0.0.1:27017/projTwoForum')
    .then(function(x) {
        console.log('Connected to database', x.connections[0].name)
        UserM.create(testUsers)
            .then()
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));