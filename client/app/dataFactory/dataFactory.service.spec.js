'use strict';

describe('Service: dataFactory', function () {

  // load the service's module
  beforeEach(module('phformsApp'));

  // instantiate service
  var dataFactory;
  beforeEach(inject(function (_dataFactory_) {
    dataFactory = _dataFactory_;
  }));

  it('should do something', function () {
    expect(!!dataFactory).to.be.true;
  });

});
