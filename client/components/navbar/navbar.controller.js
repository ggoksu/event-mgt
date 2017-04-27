'use strict';

angular.module('phformsApp')
  .controller('NavbarCtrl', function ($scope, Auth) {
    $scope.menu = [{
    	'title': 'Courses',
    	'state': 'courses'
   	}, {'title': 'Questions',
   		'state': 'questions'
   	}]

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
