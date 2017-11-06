'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = Schema(
	{
		text: String,
		createdAt: { type: Date, default: Date.now },
		user: { 
			type : mongoose.Schema.Types.ObjectId,
			ref:'User'
		}
	}
);
module.exports = mongoose.model('Chat', ChatSchema);