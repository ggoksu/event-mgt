'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
 	name: {type: String, required: true},
	begins: {type: Date, "default": Date.now},
	ends: {type: Date, "default": Date.now},
	where: String,
	trainer: {type: String, required: true}
});



module.exports = mongoose.model('Course', CourseSchema);
