const axios = require("axios");

const Logger = require('src/commons/logger/logger-config');

const ErrorDTO = require('src/commons/dtos/error-dto');
const HeadersDTO = require('src/commons/dtos/headers-dto');
const ResponseDTO = require("src/commons/dtos/response-dto");

const $LABEL = 'SendToMaster';

class SendToMaster {

    static registerUser(payload) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return axios({
                    method: 'post',
                    url: 'http://localhost:3035/register-user',
                    data: payload
            })
            .then(_response => {
                Logger.debug(`${$LOG_LABEL} Credentials sent to Master-Worker: `, new ResponseDTO());
                return resolve(_response);
            })
            .catch(error => {
                Logger.error(`${$LOG_LABEL} Couldn't sent to Master-Worker: `, new ErrorDTO(error));
                return reject(error);
            });
        });
    }
}

module.exports = SendToMaster;
