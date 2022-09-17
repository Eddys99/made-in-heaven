const UserRepository = require('../../repositories/user-credentials-repository');

const $LABEL = 'UserServices';

class UserServices {

    static registerUser(payload) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

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
}

module.exports = UserServices;
