'use strict'

var express = require('express');
var chatController = require('../controllers/chat');
var loginController = require('../controllers/login');
var api = express.Router();

//api.get('/index', chatController.getView);
api.get('/', chatController.getView);
//api.get('/auth/facebook', loginController.loginFacebook);
//api.get('/auth/facebook/callback', loginController.callbackFacebook);
//api.get('/logout', loginController.logout);

module.exports = api;