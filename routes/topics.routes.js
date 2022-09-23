const express = require('express');
const router = express.Router();

const Posts = require('../models/Post.model');
const Reply = require('../models/Reply.model');

const {loggedin, notloggedin} = require('../middleware/auth.middleware');
const {allowedCat} = require('../middleware/listedcat.middleware');

router.get('/topic/:category', allowedCat, (req, res, next) => {
    const category = req.params.category;

    Posts
        .find({category})
        .lean()
        .then(posts => {
            //console.log(posts);
            res.render('allPosts', {layout: 'forumOverview.layout.hbs', category: category, userInSession: req.session.currentUser, posts: posts});
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
})

router.get('/topic/:category/post', loggedin, (req, res, next) => {
    const category = req.params.category;

    res.render('createPost', {layout: 'forumOverview.layout.hbs', category: category, userInSession: req.session.currentUser});
})
router.post('/topic/:category/post', loggedin, (req, res, next) => {
    const category = req.params.category;
    const {title, content} = req.body;

    Posts
        .create({title, content, category, username: req.session.currentUser.username})
        .then(submission => {
            res.redirect(`/topic/${category}`)
        })
        .catch(err => {
            res.redirect(`/topic/${category}`)
        })
    //res.render('createPost', {layout: 'forumOverview.layout.hbs', category: category, userInSession: req.session.currentUser});
})

router.get('/topic/:category/postid/', (req, res, next) => {
    const category = req.params.category;
    const postID = req.query.post;

    //console.log('postid', postID);

    Posts
        .findById(postID)
        .populate('replies')
        .lean()
        .then(doc => {
            //res.send(doc);
            //console.log(doc.replies);
            res.render('selectedPost', {layout: 'forumOverview.layout.hbs', category: category, userInSession: req.session.currentUser, post: doc})
        })
        .catch(err => {
            console.log(err);
            res.redirect(`/topic/${category}`);
        })
})

router.post('/topic/:category/postid/reply/', loggedin, (req, res, next) => {
    const category = req.params.category;
    const postID = req.query.post;
    const replyContent = req.body.content;

    //console.log(category, postID, recReply.content);

    Posts
        .findById(postID)
        .then(doc => {
            Reply
                .create({postID, username: req.session.currentUser.username, content: replyContent})
                .then(createdReply => {
                    doc.replies.push(createdReply._id);
                    doc.save()
                    //res.redirect(`/topic/${category}/postid/?post=${postID}`);
                    res.redirect('back');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect(`/topic/${category}/postid/?post=${postID}`);
                });
        })
        .catch(err => {
            console.log(err);
            res.redirect(`/topic/${category}/postid/?post=${postID}`);        
        });
})
module.exports = router;