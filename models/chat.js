'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = Schema({
	user: { type : String },
	text: String,
	createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Chat', ChatSchema);