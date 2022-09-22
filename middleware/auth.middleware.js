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

const usersPage = (req, res, next) => {
    if(req.session.currentUser.username != req.params.user) {
        return res.redirect('/');
    }
    next();
}

module.exports = {
    loggedin,
    notloggedin,
    usersPage
}