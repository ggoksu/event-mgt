'use strict';

angular.module('phformsApp')
  .controller('FormsCtrl', function ($scope, Form, $stateParams, $filter) {
	var filteredForms;
  	var sumTraining = 0;
  	var sumTrainer = 0;
  	var sumFacility = 0;
  	var trainingCounter = 0;
  	var trainerCounter = 0;
  	var facilityCounter = 0;
  	var numberOfParticipants = 0;
  	$scope.show = false;
  	$scope.trainingComments = [];
  	$scope.trainerComments = [];
  	$scope.facilityComments = [];
  	$scope.additionalComments = [];
  	$scope.participants = [];

  	$scope.labels = ['Training Avg.', 'Trainer Avg.', 'Facility Avg.'];
	$scope.series = ['Series A'];

	if($stateParams.obj != null){
  		$scope.courseName = $stateParams.obj.name;
	  	$scope.courseTrainer = $stateParams.obj.trainer;
	  	$scope.courseWhere = $stateParams.obj.where;
	  	$scope.courseBegins = $stateParams.obj.begins;
	  	$scope.courseEnds = $stateParams.obj.ends;	
	  	Form.query({form : $stateParams.obj._id}, function (results) {
			filteredForms = results
			angular.forEach(filteredForms, function (form, key) {
				$scope.participants.push({"name":form.user.name+" "+form.user.lname,"email":form.user.email,"phone":form.user.phone,"company":form.user.company,"title":form.user.title})
				var partTrainingCnt = 0;
				var partSumTraining = 0;
				var partTrainerCnt = 0;
				var partSumTrainer = 0;
				var partFacilityCnt = 0;
				var partSumFacility = 0;
				numberOfParticipants += 1;
				angular.forEach(form.questions, function (question) {
					if(question.section == 'Training'){
						if(question.answer.type == 'rate'){
							trainingCounter += 1;
							sumTraining += parseInt(question.answer.input)
							partTrainingCnt += 1;
							partSumTraining += parseInt(question.answer.input)
						}
						else if(question.answer.type == 'comment'){
							if($scope.participants[key].trainingComments == undefined){
								$scope.participants[key].trainingComments = [];	
							}
							if(question.answer.input != null){
								$scope.participants[key].trainingComments.push(question.answer.input)	
							}
							
						}
					}
					else if(question.section == 'Trainer'){
						if(question.answer.type == 'rate'){
							trainerCounter += 1
							sumTrainer += parseInt(question.answer.input)
							partTrainerCnt += 1;
							partSumTrainer += parseInt(question.answer.input)
						}
						else if(question.answer.type == 'comment'){
							if($scope.participants[key].trainerComments == undefined){
								$scope.participants[key].trainerComments = [];	
							}
							if(question.answer.input != null){
							$scope.participants[key].trainerComments.push(question.answer.input)
							}
						}
					}
					else if(question.section == 'Facility'){
						if(question.answer.type == 'rate'){
							facilityCounter += 1
							sumFacility += parseInt(question.answer.input)
							partFacilityCnt += 1;
							partSumFacility += parseInt(question.answer.input)
						}
						else if(question.answer.type == 'comment'){
							if($scope.participants[key].facilityComments == undefined){
								$scope.participants[key].facilityComments = [];	
							}
							if(question.answer.input != null){
							$scope.participants[key].facilityComments.push(question.answer.input)
							}
						}
					}
					else if(question.section == 'Additional'){
						if(question.answer.type == 'comment'){
							if($scope.participants[key].additionalComments == undefined){
								$scope.participants[key].additionalComments = [];
							}
							if(question.answer.input != null){
							$scope.participants[key].additionalComments.push(question.answer.input)
							}
						}
						else if(question.answer.type == 'yesno'){
							if(question.answer.input != undefined){
								$scope.participants[key].additionalComments.push(question.name + " : " + question.answer.input)	
							}
							
						}
					} 
				})
				var partAvgTrainer = partSumTrainer / partTrainerCnt;
				var partAvgTraining = partSumTraining / partTrainingCnt;
				var partAvgFacility = partSumFacility / partFacilityCnt;
				$scope.participants[key].partAvgTrainer = partAvgTrainer
				$scope.participants[key].partAvgTraining =  partAvgTraining
				$scope.participants[key].partAvgFacility =  partAvgFacility
			})
			$scope.numberOfParticipants = numberOfParticipants;
			$scope.avgTraining = sumTraining / trainingCounter;
			$scope.avgTrainer = sumTrainer / trainerCounter;
			$scope.avgFacility = sumFacility / facilityCounter;
			$scope.exportData = {"Course Name":$scope.courseName,"Trainer":$scope.courseTrainer,"Start":$scope.courseBegins,"End":
			$scope.courseEnds,"Training Avg.": $scope.avgTraining,"Trainer Avg.":$scope.avgTrainer,"Facility Avg.":$scope.avgFacility,
			}
			$scope.data = [
				[$filter('number')($scope.avgTraining,2), $filter('number')($scope.avgTrainer,2), $filter('number')($scope.avgFacility,2)]
			];

		}, function (err) {
			console.log(err)
		})
  	}
});
