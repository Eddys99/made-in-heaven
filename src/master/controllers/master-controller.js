const PostJobService = require('../services/post-job-services')

const ErrorDTO = require('src/commons/dtos/error-dto.js');

const PostJobDTO = require('../dtos/post-job-dto');

const $LABEL = 'Master-Controller'

class MasterController {

    static registerUser(request, response) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }

    static saveJob(request, response) {
        const $JOB_LABEL = 'saveJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new PostJobDTO(request.body);

        return PostJobService.saveJob(payload)
            .then(_response => {
                console.info(`${$LOG_LABEL} post job saved in DB: `, _response);
                return response.status(200).json(_response);
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} post job failed to save in DB: `, new ErrorDTO(error));
                return response.status(400).json(error);
            });
    }

    static testPost(request, response) {
        const $JOB_LABEL = 'testPost', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = request.body;
        console.info(`${$LOG_LABEL}: payload`, payload);

        return response.json({ payload });
    }
}

module.exports = MasterController;
