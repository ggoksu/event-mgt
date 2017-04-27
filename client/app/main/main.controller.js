'use strict';

angular.module('phformsApp')
  .controller('MainCtrl', function ($scope, Course, Question, Form, $stateParams, $state, toaster) {
    var courseId = $stateParams.course
    Course.get({id: courseId}, function (data) {
    	$scope.course = data
    }, function (err) {
    	console.log(err)
    });


    //Get all active questions
    $scope.questions = Question.search(function (data) {
        for (var i = 0; i < data.length; i++) {
            if(data[i].section == 'Additional'){
                $scope.showAdditional = true;
                break;
            }
        }
    })
    //models array hold ng-model for all inputs
    $scope.models = {};
    //btnYes and btnNo define the style class for buttons
    $scope.btnYes = {};
    $scope.btnNo = {};

    $scope.emailVal = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,8}$/;
    

    $scope.showAdditional = false;

    
    //Fills models array with button input
    $scope.yesno = function (index, ans) {
    	if(ans == true){
            $scope.models[index] = 'Yes';
            $scope.btnYes[index] = index;
            $scope.btnNo[index] = -1;
        }else{
            $scope.models[index] = 'No';
            $scope.btnNo[index] = index;
            $scope.btnYes[index] = -1;
        }
    }

    //This popup used when there is missing info on form
    var pop = function(error, title, text){
            toaster.pop(error, title, text);
    };


    //user submits the form
    $scope.submit = function () {
        var unRatedQs = [];

        var newForm = {'user':{'name': $scope.fname, 'lname': $scope.lname, 'phone': $scope.phone, 'email': $scope.email,
        'company': $scope.company, 'title': $scope.title}, 'course':{'id':$scope.course._id, 'name':$scope.course.name, 'begins':$scope.course.begins,
        'ends':$scope.course.ends, 'where':$scope.course.where, 'trainer':$scope.course.trainer}};

        newForm.questions = [];
        
        for (var i = 0; i < $scope.questions.length; i++) {
            newForm.questions[i] = {'name' : $scope.questions[i].name, 'answer': {'type' : $scope.questions[i].type, 'input' : $scope.models[i]}, 'section': $scope.questions[i].section};
        }

        for (var i = 0; i < newForm.questions.length; i++) {
            if(newForm.questions[i].answer.input == 0){
                unRatedQs.push(newForm.questions[i])
            }
        }

        if(unRatedQs.length != 0){
            for (var i = 0; i < unRatedQs.length; i++) {
                pop('error', "Eksik Bilgi / Missing Information", unRatedQs[i].name);    
            }
        }else {
            Form.save(newForm, function (data) {
                $state.go('thankyou')
            }, function (err) {
                console.log(err) 
            });
        }
    }
});
