/// <reference path="../../../../typings/node/node.d.ts" />
/// <reference path="../../../../typings/jasmine/jasmine.d.ts" />
'use strict';
var should = require('should');
var app = require('../../../app');
var request = require('supertest');
var Repository = require('../repository/repository.model.js');
describe('Repository : models', function () {
    describe('#create()', function () {
        it('should create a dummy Repository', function (done) {
            var dummyData = {
                name: 'dummyRepo',
                owner: 'dummyOwner',
                collectAt: new Date(),
                forksCount: 10,
                stargazersCount: 20,
                watchersCount: 30
            };
            Repository.create(dummyData, function (err, createdDummy) {
                should.not.exists(err);
                createdDummy.name.should.equal('dummyRepo');
                createdDummy.forksCount.should.equal(10);
                done();
            });
        });
    });
    describe('#find()', function () {
        it('should find one', function (done) {
            Repository.find({ owner: 'dummyOwner' }).exec(function (err, results) {
                should.not.exists(err);
                should.exists(results);
                done();
            });
        });
        it('should find nothing', function (done) {
            Repository.find({ owner: 'test' }).exec(function (err, results) {
                results.should.be.empty;
                done();
            });
        });
    });
    describe('#remove()', function () {
        it('should clear', function (done) {
            Repository.find({}).remove(function (err, output) {
                output.should.have.property('result');
                output.result.ok.should.equal(1);
                done();
            });
        });
    });
});
describe('GET /api/v1.1/njir/repository', function () {
    it('should respond with JSON array', function (done) {
        request(app)
            .get('/api/v1.1/njir/repository')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function (err, res) {
            if (err)
                return done(err);
            res.body.should.be.instanceof(Array);
            console.log(res.body);
            done();
        });
    });
});
//# sourceMappingURL=repository.spec.js.map