'use strict'

var Chat = require('../models/chat');

function getView(req, res){
    res.render('index', {
        user: req.user
    })
}

module.exports = {
	getView
}


   
