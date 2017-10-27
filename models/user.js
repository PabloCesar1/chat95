'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = Schema({
    name: { type: String },
    email: { type: String, unique: true },
    provider_id: { type: String, unique: true }, // ID que proporciona Twitter o Facebook
    photo: { type: String }, // Avatar o foto del usuario
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});

module.exports = mongoose.model('User', UserSchema);