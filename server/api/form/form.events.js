/**
 * Form model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Form = require('./form.model');
var FormEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FormEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Form.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FormEvents.emit(event + ':' + doc._id, doc);
    FormEvents.emit(event, doc);
  }
}

module.exports = FormEvents;
