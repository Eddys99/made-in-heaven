const UserModel = require('../models/user-credentials');

const $LABEL = 'UserCredentialsRepository';

class UserCredentialsRepository {

    static saveUser(data) {
        const $JOB_LABEL = 'saveUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newUser = new UserModel(data);

            return newUser.save()
                .then(item => resolve(newUser))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to save user credentials: `, { error });
                    return reject(error);
                });
        });
    }

    static getUser(filter) {
        const $JOB_LABEL = 'getUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
           return UserModel.findOne(filter, null, null)
               .then(response => resolve(response))
               .catch(error => {
                   console.error(`${$LOG_LABEL} couldn't find user: `, { error });
                   return reject(error);
               })
        });
    }

    static updateUser(filter, query) {
        const $JOB_LABEL = 'updateUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return UserModel.updateOne(filter, query, null)
                .then(response => {
                    updateTimestamps(filter);
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to update user credentials: `, { error });
                    return reject(error);
                });
        });
    }
}

async function updateTimestamps(filter) {
    const $JOB_LABEL = 'updateTimestamps', $LOG_LABEL = `[Handler][${$LABEL}][${$JOB_LABEL}]`;

    try {
        const user = await UserModel.findOne(filter);
        user.updateExpiresAt();
        user.save();
    } catch (error) {
        console.log(`${$LOG_LABEL} failed to update timestamps: `, { error });
    }
}

module.exports = UserCredentialsRepository;
