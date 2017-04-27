'use strict';

var app = require('../../app');
var request = require('supertest');

var newCourse;

describe('Course API:', function() {

  describe('GET /api/courses', function() {
    var courses;

    beforeEach(function(done) {
      request(app)
        .get('/api/courses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          courses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      courses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/courses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/courses')
        .send({
          name: 'New Course',
          info: 'This is the brand new course!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newCourse = res.body;
          done();
        });
    });

    it('should respond with the newly created course', function() {
      newCourse.name.should.equal('New Course');
      newCourse.info.should.equal('This is the brand new course!!!');
    });

  });

  describe('GET /api/courses/:id', function() {
    var course;

    beforeEach(function(done) {
      request(app)
        .get('/api/courses/' + newCourse._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          course = res.body;
          done();
        });
    });

    afterEach(function() {
      course = {};
    });

    it('should respond with the requested course', function() {
      course.name.should.equal('New Course');
      course.info.should.equal('This is the brand new course!!!');
    });

  });

  describe('PUT /api/courses/:id', function() {
    var updatedCourse

    beforeEach(function(done) {
      request(app)
        .put('/api/courses/' + newCourse._id)
        .send({
          name: 'Updated Course',
          info: 'This is the updated course!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCourse = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCourse = {};
    });

    it('should respond with the updated course', function() {
      updatedCourse.name.should.equal('Updated Course');
      updatedCourse.info.should.equal('This is the updated course!!!');
    });

  });

  describe('DELETE /api/courses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/courses/' + newCourse._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when course does not exist', function(done) {
      request(app)
        .delete('/api/courses/' + newCourse._id)
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
