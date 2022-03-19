const express = require('express')
const router = express.Router();
const auth = require('../middlewares/auth')



router.get('/adm', auth, (req, res) => {
    res.render('adm')
})

router.get('/map', (req, res) => {
    res.render('map')
})

router.get('/', (req, res) => {

    if (req.cookies.token != null) {
        return res.redirect('/main');
    }
    res.render('login')
})

router.get('/logout', (req, res) => {

    res.clearCookie("token");
    return res.redirect('/');
})




module.exports = router;
