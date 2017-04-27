'use strict';

angular.module('phformsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('thankyou', {
        url: '/thankyou',
        templateUrl: 'app/thankyou/thankyou.html',
        controller: 'ThankyouCtrl'
      });
  });
