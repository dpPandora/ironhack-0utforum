const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/user/User.model');
const {loggedin, notloggedin} = require('../middleware/auth.middleware');

router.get('/signup', notloggedin, (req, res, next) => {
    //console.log(req.sessionID);
    res.render('signup', {layout: 'shallow.layout.hbs'});
})
router.post('/signup', notloggedin, (req, res, next) => {
    const {username, email, password, passwordVerify} = req.body;
    let errors = [];

    if (password != passwordVerify) {
        errors.push("Passwords do not match");
    }
    if (password.length < 4) {
        errors.push("Password is too short");
    }

    if (errors.length > 0) {
        //console.log(errors);
        res.render('signup', {layout: 'shallow.layout.hbs', errors: errors});
        return;
    }

    let hashedPass = bcrypt.hashSync(password);

    User.create({username, email, password: hashedPass})
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            errors.push(err);
            res.render('signup', {layout: 'shallow.layout.hbs', errors: errors});
            return;
        });
    
})

router.get('/login', notloggedin,(req, res, next) => {
    res.render('login', {layout: 'shallow.layout.hbs'});
});
router.post('/login', notloggedin,(req, res, next) => {
    //console.log(req.body);
    //res.render('login', {layout: 'shallow.layout.hbs'});

    const {username, password} = req.body;
    User
        .findOne({username: username})
        .then(doc => {
            console.log('Given username: ', username);
            console.log('Mongoose findOne output: ', doc);//TODO remove this before deployment

            if (doc === null) {
                res.render('login', {layout: 'shallow.layout.hbs', errors: ['User not found']});
                return;
            }
            
            const correctPassword = bcrypt.compareSync(password, doc.password);
            //console.log('Right password:', correctPassword);

            if(correctPassword) {
                req.session.currentUser = {
                    username: doc.username,
                    userId: doc._id
                }

                console.log(req.session.currentUser);
                res.redirect('/');
                return;
            }
            else {
                res.render('login', {layout: 'shallow.layout.hbs', errors: ['Incorrect password']});
                return;
            }

            //res.redirect('/login');
        })
        .catch(err => {
            res.render('login', {layout: 'shallow.layout.hbs', errors: err});
            return;
        });
})

router.get('/signout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) next(err);
        res.redirect('/');
    });
});
module.exports = router;