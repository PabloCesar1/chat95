'use strict'

var Chat = require('../models/chat');

function getView(req, res){
    res.render('index', {
        text:'funciona',
        user: req.user
    })
}

module.exports = {
	getView
}


   
