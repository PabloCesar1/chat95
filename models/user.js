'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    provider: { type: String },
    provider_id: { type: String, unique: true }, // ID que proporciona Facebook    
    name: { type: String },//Full name
    firstname: { type: String },//solo primer nombre
    email: { type: String },//Correo
    photo: { type: String }, // Avatar o foto del usuario
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = mongoose.model('User', UserSchema);