const ErrorDTO = require('src/commons/dtos/error-dto.js');
const Logger = require('src/commons/logger/logger-config.js');

const UserModel = require('../models/user-credentials');

const $LABEL = 'MasterRepository';

class UserCredentialsRepository {

    static saveUser (data) {
        const $JOB_LABEL = 'saveUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newUser = new UserModel(data);

            return newUser.save((error, item) => {
                if (error) {
                    Logger.error(`${$LOG_LABEL} failed to save user credentials: `, new ErrorDTO(error));
                    return reject(error);
                } else {
                    Logger.debug(`${$LOG_LABEL} user credentials saved: `, item);
                    return resolve(newUser);
                }
            });
        })
    }
}

module.exports = UserCredentialsRepository;
