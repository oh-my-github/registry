var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;

exports.setup = function (User, config) {
  passport.use(new GitHubStrategy({
      clientID: config.github.clientID,
      clientSecret: config.github.clientSecret,
      callbackURL: config.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'github.id': profile.id
      }, function(err, user) {
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            role: 'user',
            username: profile.username,
            provider: 'github',
            github: {
              id: profile._json.id,
              login: profile._json.login,
              email: profile.emails[0].value,
              accessToken: accessToken,
              refreshToken: refreshToken,
              following: profile._json.following,
              followers: profile._json.followers,
              createdAt: profile._json.created_at,
              updatedAt: profile._json.updated_at,
              blog: profile._json.blog,
              company: profile._json.company,
              location: profile._json.location
            }
          });
          user.save(function(err) {
            if (err) return done(err);
            done(err, user);
          });
        } else {
          return done(err, user);
        }
      });
    }
  ));
};
