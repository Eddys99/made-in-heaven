const ErrorDTO = require('src/commons/dtos/error-dto.js');
const ResponseDTO = require('src/commons/dtos/response-dto');
const Logger = require('src/commons/logger/logger-config.js');

const $LABEL = 'UserServices';

class UserServices {

    static registerUser(payload) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return UserRepository.saveUser(payload)
            .then(response => {

            })
            .catch(error => {

            });
    }
}

module.exports = UserServices;
