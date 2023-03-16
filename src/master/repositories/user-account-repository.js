const UserAccountModel = require('../models/user-account');

const $LABEL = 'UserAccountRepository';

class UserAccountRepository {

    static saveUser(data) {
        const $JOB_LABEL = 'saveUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newUser = new UserAccountModel(data);

            return newUser.save()
                .then(item => resolve(newUser))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to save user account: `, { error });
                    return reject(error);
                });
        });
    }

    static getUser(filter) {
        const $JOB_LABEL = 'getUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return UserAccountModel.findOne(filter, null, null)
                .then(response => resolve(response))
                .catch(error => {
                    console.error(`${$LOG_LABEL} couldn't find user: `, { error });
                    return reject(error);
                });
        });
    }

    static updateUser(filter, query) {
        const $JOB_LABEL = 'updateUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            UserAccountModel.updateOne(filter, query, null)
                .then(response => resolve(response))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to update user account: `, { error });
                    return reject(error);
                });
        });
    }
}

module.exports = UserAccountRepository;
