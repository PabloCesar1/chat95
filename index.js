const mongo = require('mongodb').MongoClient
const client = require('socket.io').listen(4000).sockets
const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3000
var Chat = require('./models/chat')
var http = require('http').Server(app);
var io = require('socket.io')(http);



mongoose.connect('mongodb://pablo95:passtodb@ds121015.mlab.com:21015/mychat', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("La base de datos esta corriendo correctmente");
        //----------------------------------------------------------------
        //                                        || Connect to socket.io ||
        io.on('connection', (socket) => {
            let chat = Chat
            //Function to send status
            var sendStatus = (s) => {
                socket.emit('status', s)
            }

            chat.find({}).populate('user').exec((err, res) => {// populate to get a users data
                if (err) { // Si hay un id de usuario que no existe mostrará un mensaje de error
                    throw err
                }
                socket.emit('output', res)//Send messages at client in connection
                console.log("Datos obtenidos:" + res)
                socket.broadcast.emit('newuser', { text: 'Un nuevo usuario se ha conectado.' });
            })
            //----------------------------------------------------------------
            //                                        || Al enviar un mensaje ||
            socket.on('input', (data) => {
                var  user = data.user
                var  text = data.text
                if (user == '' || text == '') {//Si los datos no estan completos
                    sendStatus('Nombre y mensaje requeridos')//Se envia un mensaje de alerta
                } else {//Si los datos estan completos
                    var chat = new Chat({ user: user, text: text })//se prepara el mensaje a guardar
                    console.log(data)
                    chat.save((err, messageStored) => {//se guarda el mensaje mediante esta funcion
                        //////////////////////Envio de mensaje a los usuarios//////////////////////
                        io.emit('newMessage', chat)//Se envia el mensaje guardado pero solo id y texto (no muestra todo)
                        /*messageStored.populate('user').exec((err, res) => {
                            console.log('El mensaje: '+res)
                        })/*
                        /*Chat.findOne({ '_id': user }).populate('user').exec((err, res) => {// populate para obtener los datos del usuario que envio el mensaje
                            if (err) { // Si hay un id de usuario que no existe mostrará un mensaje de error
                                throw err
                            }
                            socket.emit('output', res)//Send messages at client in connection
                        })*/
                        ///////////////////////////////////////////////////////////////
                        sendStatus({//se muestra mensaje de confirmacion
                            message: 'Mensaje enviado',
                            clear: true
                        })
                    })
                }
            })

            socket.on('clear', (data) => {
                chat.remove({}, () => {
                    socket.emit('Borrados')
                })
            })

        })

        //-----------------------------------------------------
        http.listen(port, function () {
            //Corriendo en el puerto...
            console.log("Api Rest server listening in port " + port);
        });
    }
});
