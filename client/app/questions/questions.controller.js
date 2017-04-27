'use strict';

angular.module('phformsApp')
  .controller('QuestionsCtrl', function ($scope, Question) {
    
    Question.query(function (results) {
        $scope.questions = results
    }, function (error) {
        console.log(error)
    })


    $scope.addQuestion = function (question) {
    	var question = {"name": $scope.name, "type": $scope.type, "section": $scope.section, "show": false}
    	Question.save(question, function (data) {
    		$scope.questions.push(data)
    		$scope.name = '';
    		$scope.type = '';
    		$scope.section = '';
    		$scope.show = false;
    	})
    }

    $scope.deleteQuestion = function (question) {
    	Question.remove({id: question._id})
    	$scope.questions.splice($scope.questions.indexOf(question), 1)
    }

    $scope.toggleSelected = function (question) {
        Question.update({id: question._id}, {"show": question.show})
    }

  });
