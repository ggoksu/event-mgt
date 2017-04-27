'use strict';

angular.module('phformsApp')
  .factory('Course', function ($resource) {
    return $resource('/api/courses/:id', {
      id: '@_id'
    }, 
    {
      'update': { method: 'PUT'}
    });
  });
