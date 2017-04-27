'use strict';

angular.module('phformsApp')
  .directive('formrating', function () {
    return {
      templateUrl: 'components/rating/rating.html',
      restrict: 'EA',
      scope:{
      	rate: '=rate',
      	max: '=max'
      },
      link: function (scope, element, attrs) {
        scope.rate = 0;
      	scope.updateStars = function () {
      		var idx = 0;
      		scope.stars = [];
      		for(idx = 0; idx < scope.max; idx +=1){
      			scope.stars.push({
      				full: scope.rate > idx
      			})
      		}
      	}

      	scope.starClass = function (star, idx) {
      		var starClass = 'fa fa-star-o';
      		if(star.full){
      			starClass = 'fa fa-star';
      		}
      		return starClass;
      	}

      	scope.$watch('rate', function (newVal, oldVal) {
      		if(newVal !== null && newVal !== undefined){
      			scope.updateStars();
      		}
      	})

      	scope.setRating = function (idx) {
      		scope.rate = idx + 1;
      	}

      	scope.hover = function(idx) {
		      scope.hoverIdx = idx;
        };

		    scope.stopHover = function() {
    		  scope.hoverIdx = -1;
    		};

		    scope.starColor = function(idx) {
    		  var starClass = 'rating-normal';
    		  if (idx <= scope.hoverIdx) {
    			starClass = 'rating-highlight'; 
    		  }
     		 	return starClass;
    		};

      }
    };
  });
