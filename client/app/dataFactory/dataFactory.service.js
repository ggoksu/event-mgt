//dataFactory is used for typeAhead
'use strict';

angular.module('phformsApp')
  .factory('dataFactory', function ($resource) {
    return $resource('/api/json', null,{
    	'trainers': {method: 'GET', isArray: true, params: {
    		asset: 'trainers'
    	}},
    	'locations': {method: 'GET', isArray: true, params: {
    		asset: 'locations'
    	}}
    })
  });
