'use strict';

angular.module('phformsApp')
  .factory('Form', function ($resource) {
    return $resource('/api/forms/:id',{
      id: '@_id'
    },
    {
      'update': { method: 'PUT'} 
    });
  });
