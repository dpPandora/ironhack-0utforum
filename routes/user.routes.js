const express = require('express');
const router = express.Router();

const User = require('../models/user/User.model');
const Posts = require('../models/Post.model');

router.get('/users', (req, res, next) => {
    const userInSession = req.session.currentUser;

    User
        .find({}, 'username creationDate tagline')
        .lean()
        .then(users => {
            //console.log(users);
            res.render('allUsers', {layout: 'forumOverview.layout.hbs', category: 'users', userInSession: req.session.currentUser, users: users})
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });

});

router.get('/users/:user', (req, res, next) => {
    const userInSession = req.session.currentUser;
    const username = req.params.user;
    
    User
        .findOne({username}, 'username creationDate tagline bio')
        .lean()
        .then(user => {
            //console.log(user);
            res.render('aUser', {layout: 'forumOverview.layout.hbs', category: `user/${user.username}`, userInSession: userInSession, user: user})
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
});

module.exports = router;