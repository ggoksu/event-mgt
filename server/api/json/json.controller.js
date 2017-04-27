/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/json              ->  index
 * POST    /api/json              ->  create
 * GET     /api/json/:id          ->  show
 * PUT     /api/json/:id          ->  update
 * DELETE  /api/json/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Json = require('./json.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Jsons
exports.index = function(req, res) {
  if(req.query.asset == 'trainers'){
    Json.findAsync({type:'trainer'})
    .then(responseWithResult(res))
    .catch(handleError(res));  
  }else if(req.query.asset == 'locations'){
    Json.findAsync({type:'location'})
    .then(responseWithResult(res))
    .catch(handleError(res));
  }
};

// Gets a single Json from the DB
exports.show = function(req, res) {
  Json.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Json in the DB
exports.create = function(req, res) {
  Json.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Json in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Json.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Json from the DB
exports.destroy = function(req, res) {
  Json.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
