'use strict'

var Chat = require('../models/chat');

function getView(req, res){
    console.log(req.user)
    res.render('index', {
        text:'funciona',
        user: req.user
    })
}

module.exports = {
	getView
}


   
