'use strict';

angular.module('phformsApp')
  .factory('Question', function ($resource) {
    return $resource('/api/questions/:id/', {id:'@_id'}, {
    	'update': { method: 'PUT'},
    	'search': {method: 'GET', params:{active:'true'}, isArray: true}
    });
  });
