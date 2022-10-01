const UserAccountModel = require('../models/user-account');

const $LABEL = 'UserAccountRepository';

class UserAccountRepository {

    static saveUser(data) {
        const $JOB_LABEL = 'saveUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newUser = new UserAccountModel(data);

            return newUser.save((error, item) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to save user account: `, { error });
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
            UserAccountModel.findOne(filter, null, null, (error, response) => {
                if (error) {
                    console.error(`${$LOG_LABEL} couldn't find user: `, { error });
                    return reject(error);
                } else {
                    return resolve(response);
                }
            });
        });
    }

    static updateUser(filter, query) {
        const $JOB_LABEL = 'updateUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            UserAccountModel.updateOne(filter, query, null, (error, response) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to update user account: `, { error });
                    return reject(error);
                } else {
                    return resolve(response);
                }
            });
        });
    }
}

module.exports = UserAccountRepository;
