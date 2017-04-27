'use strict';

describe('Service: forms', function () {

  // load the service's module
  beforeEach(module('phformsApp'));

  // instantiate service
  var forms;
  beforeEach(inject(function (_forms_) {
    forms = _forms_;
  }));

  it('should do something', function () {
    expect(!!forms).to.be.true;
  });

});
