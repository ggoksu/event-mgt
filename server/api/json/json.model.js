'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var JsonSchema = new Schema({
  data: String,
  type: {type: String, enum:['trainer', 'location']}
});

module.exports = mongoose.model('Json', JsonSchema);
