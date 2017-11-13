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

            socket.on('input', (data) => {
                let user = data.user
                let text = data.text
                if (user == '' || text == '') {
                    sendStatus('Nombre y mensaje requeridos')
                } else {
                    var chat = new Chat({ user: user, text: text })
                    //var chat = new Chat({ 'user': {'name':user}, text: text })                    
                    console.log(data)
                    chat.save(() => {
                        io.emit('output', [chat])//Send a new message
                        sendStatus({
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
