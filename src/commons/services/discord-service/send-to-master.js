const axios = require("axios");

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
            .then(response => {
                console.log(`${$LOG_LABEL} Credentials sent to Master-Worker: `, { response });
                return resolve(response);
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} Couldn't sent to Master-Worker: `, { error });
                return reject(error);
            });
        });
    }
}

module.exports = SendToMaster;
