/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/chai/chai.d.ts" />
/**
 * Created by JunHo on 2015. 9. 26..
 */
var passport = require("./passport.js");
var assert = require("assert");
import chai = require("chai");
var User = require('../../api/v1.1/user/user.model');

describe("passport", function(){
  describe("updateProfile", function(){
    it("it should update profile of specific document", function(){

      // create a sample user
      var user1 = new User({
          id: "sampleID",
          name: "test",
          githubProfile: {
            location: "Seoul, South Korea",
            company: "SamsungSDS",
            blog: "http://tocology.github.io",
            updatedAt: new Date("2015-09-21T23:52:28Z"),
            createdAt: new Date("2014-05-18T00:26:34Z"),
            followers: 1,
            following: 0,
            accessToken: "testToken",
            email: "hwangjun7777@gmail.com",
            login: "tocology",
            id: "sampleID"
        }
      });

      // create more sample args
      var accessToken = "changeTestToken";
      var profile = {
        emails: [{value: "hwangjun7777@naver.com"}],
        _json: {
          id: "sampleID",
          login: "lambda",
          following: 100,
          followers: 200,
          createAt: "2014-05-18T00:26:34Z",
          updateAt: new Date().toISOString(),
          blog: "http://tocology.github.io",
          location: "Seoul, South Korea",
          company: "SamsungSDS"
        }
      };

      // save this user first
      user1.save(function(err) {
        if(err) {
          assert(false);
        };
        passport.updateProfile(User, accessToken, "", profile, function(){
          User.findOne({
            'githubProfile.id': "sampleID"
          }, function(err, user){
            chai.expect(user.githubProfile.login).to.equal("lambda");
          });
        });
      });

    });
  });
});
