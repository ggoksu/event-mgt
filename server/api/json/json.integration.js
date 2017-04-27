'use strict';

var app = require('../../app');
var request = require('supertest');

var newJson;

describe('Json API:', function() {

  describe('GET /api/json', function() {
    var jsons;

    beforeEach(function(done) {
      request(app)
        .get('/api/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          jsons = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      jsons.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/json', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/json')
        .send({
          name: 'New Json',
          info: 'This is the brand new json!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newJson = res.body;
          done();
        });
    });

    it('should respond with the newly created json', function() {
      newJson.name.should.equal('New Json');
      newJson.info.should.equal('This is the brand new json!!!');
    });

  });

  describe('GET /api/json/:id', function() {
    var json;

    beforeEach(function(done) {
      request(app)
        .get('/api/json/' + newJson._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          json = res.body;
          done();
        });
    });

    afterEach(function() {
      json = {};
    });

    it('should respond with the requested json', function() {
      json.name.should.equal('New Json');
      json.info.should.equal('This is the brand new json!!!');
    });

  });

  describe('PUT /api/json/:id', function() {
    var updatedJson

    beforeEach(function(done) {
      request(app)
        .put('/api/json/' + newJson._id)
        .send({
          name: 'Updated Json',
          info: 'This is the updated json!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedJson = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedJson = {};
    });

    it('should respond with the updated json', function() {
      updatedJson.name.should.equal('Updated Json');
      updatedJson.info.should.equal('This is the updated json!!!');
    });

  });

  describe('DELETE /api/json/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/json/' + newJson._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when json does not exist', function(done) {
      request(app)
        .delete('/api/json/' + newJson._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
