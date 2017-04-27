'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var jsonCtrlStub = {
  index: 'jsonCtrl.index',
  show: 'jsonCtrl.show',
  create: 'jsonCtrl.create',
  update: 'jsonCtrl.update',
  destroy: 'jsonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var jsonIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './json.controller': jsonCtrlStub
});

describe('Json API Router:', function() {

  it('should return an express router instance', function() {
    jsonIndex.should.equal(routerStub);
  });

  describe('GET /api/json', function() {

    it('should route to json.controller.index', function() {
      routerStub.get
                .withArgs('/', 'jsonCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/json/:id', function() {

    it('should route to json.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'jsonCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/json', function() {

    it('should route to json.controller.create', function() {
      routerStub.post
                .withArgs('/', 'jsonCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/json/:id', function() {

    it('should route to json.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'jsonCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/json/:id', function() {

    it('should route to json.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'jsonCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/json/:id', function() {

    it('should route to json.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'jsonCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
