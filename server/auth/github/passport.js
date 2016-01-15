/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
function updateProfile(User, accessToken, refreshToken, profile, callback) {
    User.update({ 'githubProfile.id': profile._json.id }, { $set: { 'githubProfile.login': profile._json.login,
            'githubProfile.email': profile.emails[0].value,
            'githubProfile.accessToken': accessToken,
            'githubProfile.refreshToken': refreshToken,
            'githubProfile.following': profile._json.following,
            'githubProfile.followers': profile._json.followers,
            'githubProfile.createdAt': new Date(profile._json.created_at),
            'githubProfile.updatedAt': new Date(profile._json.updated_at),
            'githubProfile.blog': profile._json.blog,
            'githubProfile.company': profile._json.company,
            'githubProfile.location': profile._json.location } }, function (err) {
        console.log(err);
        if (callback) {
            callback();
        }
    });
}
exports.setup = function (User, config) {
    passport.use(new GitHubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({
            'githubProfile.id': profile._json.id
        }, function (err, user) {
            if (!user) {
                user = new User({
                    id: profile._json.id.toString(),
                    name: profile.displayName,
                    githubProfile: {
                        id: profile._json.id.toString(),
                        login: profile._json.login,
                        email: profile.emails[0].value,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        following: profile._json.following,
                        followers: profile._json.followers,
                        createdAt: new Date(profile._json.created_at),
                        updatedAt: new Date(profile._json.updated_at),
                        blog: profile._json.blog,
                        company: profile._json.company,
                        location: profile._json.location
                    }
                });
                user.save(function (err) {
                    if (err)
                        return done(err);
                    done(err, user);
                });
            }
            else {
                updateProfile(User, accessToken, refreshToken, profile);
                return done(err, user);
            }
        });
    }));
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=passport.js.map