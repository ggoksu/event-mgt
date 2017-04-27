'use strict';

angular.module('phformsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main/:course',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });
