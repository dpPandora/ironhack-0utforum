const express = require('express');
const router = express.Router();

const Category = require('../models/Category.model');

router.get('/', (req, res, next) => {
    //console.log(req.session.currentUser);
/*
    Category
        .find({})
        .sort({topic: -1})
        .lean()
        .then(cats => {
            console.log(cats);

            //let newojb
            //let chos;
            //for cats length
            //  if cats[i].topic != chos

        })
        .catch(err => {
            console.log(err);
        });
*/
    res.render('home',{layout: 'shallow.layout.hbs', userInSession: req.session.currentUser});//it looks like ill have to specify .hbs not sure why
});

module.exports = router;