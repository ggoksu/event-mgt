'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
require('mongoose-type-email');

var FormSchema = new Schema({
	user: {
		name: {type: String, required: true},
		lname: {type: String, required: true},
		company: {type: String, required: true},
		title: {type: String},
		phone: {type: String},
		email: {type: String, required: true}	
	},
	course: {
		id: String,
		name: String,
		begins: Date,
		ends: Date,
		where: String,
		trainer: String
	},
  	questions: [{
		name: String,
		answer:{
			type: {type: String,enum: ['rate', 'comment', 'yesno']},
			input: String
		},
		section : String
  }]
});



module.exports = mongoose.model('Form', FormSchema);
