const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserModel = require("../master/models/user-account");
const getUtil = require('src/commons/getUtil');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy( { usernameField: 'username', passwordField: 'password' },
            (username, password, done) => {
                UserModel.findOne({ username: username }, (error, user) => {
                    if (error) {
                        throw error;
                    }
                    if (!getUtil.isObjectWithKeys(user)) {
                        return done(null, false);
                    }
                    bcrypt.compare(password, user.password, (_error, isMatch) => {
                        if (_error) {
                            throw _error;
                        }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
                });
            })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        UserModel.findOne({ _id: id }, (error, user) => {
            const userInformation = {
                username: user.username,
            };
            done(error, userInformation);
        });
    });
};
