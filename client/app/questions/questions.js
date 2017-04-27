'use strict';

angular.module('phformsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('questions', {
        url: '/admin/questions/:active',
        templateUrl: 'app/questions/questions.html',
        controller: 'QuestionsCtrl',
        authenticate: true
      });
  });
