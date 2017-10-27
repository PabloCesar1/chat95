'use strict'

var Chat = require('../models/chat');
var passport = require('passport');
require('../passport')(passport);


function loginFacebook() {
    console.log('Autenticando')
    passport.authenticate('facebook')
}

function callbackFacebook() {
    console.log('redirigiendo')
    passport.authenticate('facebook',
        { successRedirect: '/', failureRedirect: '/' }
    )
}
function logout(req, res) {
    req.logout();
    res.redirect('/');
}

module.exports = {
    loginFacebook, callbackFacebook, logout
}

