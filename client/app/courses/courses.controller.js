'use strict';

angular.module('phformsApp')
  .controller('CoursesCtrl', function ($scope, Course, dataFactory, $state) {

    dataFactory.trainers(function (results) {
        $scope.trainers = results
    })

    dataFactory.locations(function (results) {
        $scope.locations = results;
    })

    $scope.sortType = 'begins';
    $scope.sortReverse = true;
    $scope.searchCourse = '';

    // Use the User $resource to fetch all users
    Course.query(function (results) {
        $scope.courses = results
    }, function (error) {
        console.log(error)
    })

    $scope.go2Forms = function (form, obj) {
        $state.go(form, obj)
    }
    
    $scope.addCourse = function (course) {
        var startDate = moment($scope.startDate, "DD-MM-YYYY")
        var endDate = moment($scope.endDate, "DD-MM-YYYY")
        var newCourse = {"name": $scope.courseName, "begins": startDate, "ends": endDate, "trainer": $scope.trainer, "where": 
        $scope.where}
        var trainerFound = false;
        var locationFound = false;
    	Course.save(newCourse,
    			function (data) {
                    for(var i = 0; i < $scope.trainers.length; i++){
                        if(angular.equals($scope.trainers[i].data, $scope.trainer)){
                            trainerFound = true;
                            break;
                        }    
                    }

                    if(!trainerFound){
                        dataFactory.save({"data": $scope.trainer, "type": "trainer"}, function (result) {
                                $scope.trainers.push(result)
                                trainerFound = false;
                        })
                    }

                    for(var i = 0; i < $scope.locations.length; i++){
                        if(angular.equals($scope.locations[i].data, $scope.where)){
                            locationFound = true;
                            break;
                        }    
                    }

                    if(!locationFound){
                        dataFactory.save({"data": $scope.where, "type": "location"}, function (result) {
                                $scope.locations.push(result)
                                locationFound = false;
                        })
                    }
                    
    				
                    $scope.courses.push(data)
    				$scope.courseName = ''
    				$scope.trainer = ''
                    $scope.where = ''


    			},
    			function (err) {
    				console.log(err)
    			}
    		)
    }

    $scope.deleteCourse = function (course) {
    	Course.remove({id: course._id})
    	$scope.courses.splice($scope.courses.indexOf(course), 1)
    }


    
});
