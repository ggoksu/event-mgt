'use strict';

angular.module('phformsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forms', {
        url: '/admin/forms',
        templateUrl: 'app/forms/forms.html',
        controller: 'FormsCtrl',
        authenticate: true,
        params: {
	        obj: null
	    }
      });
  });
