'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var courseCtrlStub = {
  index: 'courseCtrl.index',
  show: 'courseCtrl.show',
  create: 'courseCtrl.create',
  update: 'courseCtrl.update',
  destroy: 'courseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var courseIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './course.controller': courseCtrlStub
});

describe('Course API Router:', function() {

  it('should return an express router instance', function() {
    courseIndex.should.equal(routerStub);
  });

  describe('GET /api/courses', function() {

    it('should route to course.controller.index', function() {
      routerStub.get
                .withArgs('/', 'courseCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/courses/:id', function() {

    it('should route to course.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'courseCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/courses', function() {

    it('should route to course.controller.create', function() {
      routerStub.post
                .withArgs('/', 'courseCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/courses/:id', function() {

    it('should route to course.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'courseCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/courses/:id', function() {

    it('should route to course.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'courseCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/courses/:id', function() {

    it('should route to course.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'courseCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
