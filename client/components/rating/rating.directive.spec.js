'use strict';

describe('Directive: rating', function () {

  // load the directive's module and view
  beforeEach(module('phformsApp'));
  beforeEach(module('components/rating/rating.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<rating></rating>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the rating directive');
  }));
});
