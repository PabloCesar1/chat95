'use stric'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ChatSchema = Schema(// Collection with messages
	{
		text: String,//Text type string
		createdAt: { type: Date, default: Date.now },
		user: { 
			type : mongoose.Schema.Types.ObjectId,
			ref:'User',
		}
	}
);
module.exports = mongoose.model('Chat', ChatSchema);