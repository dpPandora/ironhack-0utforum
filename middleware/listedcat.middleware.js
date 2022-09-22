let catList = ['programming', 'technews']

const allowedCat = (req, res, next) => {
    if (catList.includes(req.params.category)) {
        next();
        return;
    }
    return res.redirect('/');
}

module.exports = {allowedCat};