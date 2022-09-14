const ErrorDTO = require('src/commons/dtos/error-dto.js');
const Logger = require('src/commons/logger/logger-config.js');

const UserRepository = require('../../repositories/user-credentials-repository');

const $LABEL = 'UserServices';

class UserServices {

    static registerUser(payload) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return UserRepository.saveUser(payload)
                .then(response => {
                    Logger.debug(`${$LOG_LABEL} user credentials saved: `, response);
                    return resolve(response);
                })
                .catch(error => {
                    Logger.error(`${$LOG_LABEL} failed to save user credentials: `, new ErrorDTO(error));
                    return reject(error);
                });
        });
    }
}

module.exports = UserServices;
