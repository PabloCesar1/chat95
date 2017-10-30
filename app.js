'use strict'

var express = require('express')
var session = require('express-session')
var passport = require('passport')
var bodyParser = require('body-parser')
var expressHandlebars = require('express-handlebars')
var path = require('path')
var app = express();

//Cargar rutas
var chat_routes = require('./routes/chat');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'principal' }));
app.set('view engine', 'handlebars');

//--------------Session---------------------
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
app.use(session({secret: '1234ppp'}))
// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());
//-----------------------------------------

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/', chat_routes);


module.exports = app;


