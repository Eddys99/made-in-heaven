const UserModel = require('../models/user-credentials');

const $LABEL = 'MasterRepository';

class UserCredentialsRepository {

    static saveUser(data) {
        const $JOB_LABEL = 'saveUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newUser = new UserModel(data);

            return newUser.save((error, item) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to save user credentials: `, { error });
                    return reject(error);
                } else {
                    return resolve(newUser);
                }
            });
        });
    }

    static getUser(filter) {
        const $JOB_LABEL = 'getUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
           UserModel.findOne(filter, null, null, (error, response) => {
               if (error) {
                   console.error(`${$LOG_LABEL} couldn't find user: `, { error });
                   return reject(error);
               } else {
                   return resolve(response);
               }
           });
        });
    }
}

module.exports = UserCredentialsRepository;
