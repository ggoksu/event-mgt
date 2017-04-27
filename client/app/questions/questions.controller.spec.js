'use strict';

describe('Controller: QuestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('phformsApp'));

  var QuestionsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuestionsCtrl = $controller('QuestionsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
