const loggedin = (req, res, next) => {
    if(!req.session.currentUser) {
        return res.redirect('/login');
    }
    next();
}

const notloggedin = (req, res, next) => {
    if(req.session.currentUser) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    loggedin,
    notloggedin
}