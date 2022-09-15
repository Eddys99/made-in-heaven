const PostJobRepository = require('../../repositories/post-job-repository');

const SavePostJob = require('./dtos/save-post-job');

const $LABEL = 'PostJobService';

class PostJobService {

    static saveJob(payload) {
        const $JOB_LABEL = 'saveJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return PostJobRepository.saveJob(new SavePostJob(payload))
                .then(response => {
                    console.log(`${$LOG_LABEL} post job saved in DB: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} couldn't save post job in DB: `, { error });
                    return reject(error);
                });
        });
    }

    static makePost(payload) {
        const $JOB_LABEL = 'makePost', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return PostJobService.saveJob(payload)
                .then(response => {

                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} couldn't save post job in DB: `, { error });
                    return reject(error);
                });
        });
    }

    static getTargetChannels() {
        const $JOB_LABEL = 'getTargetChannels', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {

        });
    }
}

module.exports = PostJobService;
