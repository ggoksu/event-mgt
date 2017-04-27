'use strict';

angular.module('phformsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('courses', {
        url: '/admin/courses',
        templateUrl: 'app/courses/courses.html',
        controller: 'CoursesCtrl',
        authenticate: true
      });
  });
