const PostJob = require('../models/post-job');

const $LABEL = 'MasterRepository';

class PostJobsRepository {

    static saveJob (data) {
        const $JOB_LABEL = 'create', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newJob = new PostJob(data);

            return newJob.save((error, item) => {
                if (error) {
                    console.error(`${$LOG_LABEL} post job failed: `, { error });
                    return reject(error);
                } else {
                    console.log(`${$LOG_LABEL} post job saved: `, { item });
                    return resolve(newJob);
                }
            });
        })
    }
}

module.exports = PostJobsRepository;
