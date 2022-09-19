const UserRepository = require('../../repositories/user-credentials-repository');

const FindByManyFields = require('../dtos/find-by-many-fields');

const $LABEL = 'UserServices';

class UserServices {

    static registerUser(payload) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = { user_id: payload.user_id };

        return new Promise((resolve, reject) => {

            return UserRepository.saveUser(payload)
                .then(response => {
                    console.log(`${$LOG_LABEL} user credentials saved: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to save user credentials: `, { error });
                    return reject(error);
                });
        });
    }

    static getUserCredentials(user_id, discord_user_id) {
        const $JOB_LABEL = 'getUserCredentials', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FindByManyFields([user_id, discord_user_id]);

        return new Promise((resolve, reject) => {
            return UserRepository.getUser(filter)
                .then(response => {

                })
                .catch(error => {

                });
        });
    }
}

module.exports = UserServices;
