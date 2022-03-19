const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    if (req.cookies.token == null) {
        res.redirect('/');
        return
    }
    const tokenHeader = req.cookies.token

    jwt.verify(tokenHeader, process.env.TOKEN_PASS, (err, decoded) => {
        if (err) {
            res.clearCookie("token");
            res.redirect('/');
            return
        }
        return next();
    })
}

module.exports = auth;