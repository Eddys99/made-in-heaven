const ErrorDTO = require('src/commons/dtos/error-dto.js');
const ResponseDTO = require('src/commons/dtos/response-dto');
const Logger = require('src/commons/logger/logger-config.js');

const PostJobService = require('../services/post-job-services/post-job-service');
const UserServices = require('../services/user-services/user-services');

const PostJobDTO = require('../dtos/post-job-dto');
const UserCredentialsDTO = require('../dtos/user-credentials-dto');

const $LABEL = 'Master-Controller'

class MasterController {

    static registerUser(request, response) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserCredentialsDTO(request.body);

        return UserServices.registerUser(payload)
            .then(_response => {

            })
            .catch(error => {

            });
    }

    static saveJob(request, response) {
        const $JOB_LABEL = 'saveJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new PostJobDTO(request.body);

        return PostJobService.saveJob(payload)
            .then(_response => {
                Logger.debug(`${$LOG_LABEL} post job saved in DB: `, new ResponseDTO());
                return response.status(200).json(_response);
            })
            .catch(error => {
                Logger.error(`${$LOG_LABEL} post job failed to save in DB: `, new ErrorDTO(error));
                return response.status(400).json(error);
            });
    }

    static testPost(request, response) {
        const $JOB_LABEL = 'testPost', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = request.body;
        Logger.debug(`${$LOG_LABEL}: payload`, payload);

        return response.json({ payload });
    }
}

module.exports = MasterController;
