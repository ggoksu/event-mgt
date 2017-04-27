'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, enum: ['rate', 'comment', 'yesno'], required: true},
  section: {type: String, required: true, enum: ['Training', 'Trainer', 'Facility', 'Additional']},
  show: {type: Boolean, "default": false}
});

module.exports = mongoose.model('Question', QuestionSchema);
