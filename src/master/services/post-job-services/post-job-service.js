const ErrorDTO = require('src/commons/dtos/error-dto.js');
const ResponseDTO = require('src/commons/dtos/response-dto');
const Logger = require('src/commons/logger/logger-config.js');

const PostJobRepository = require('../../repositories/post-job-repository');

const SavePostJob = require('./dtos/save-post-job');

const $LABEL = 'PostJobService';

class PostJobService {

    static saveJob(payload) {
        const $JOB_LABEL = 'saveJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return PostJobRepository.saveJob(new SavePostJob(payload))
                .then(response => {
                    Logger.debug(`${$LOG_LABEL} post job saved in DB: `, new ResponseDTO());
                    return resolve(response);
                })
                .catch(error => {
                    Logger.error(`${$LOG_LABEL} couldn't save post job in DB: `, new ErrorDTO(error));
                    return reject(error);
                });
        });
    }
}

module.exports = PostJobService;
