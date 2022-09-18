const ErrorDTO = require('src/commons/dtos/error-dto.js');
const ResponseDTO = require('src/commons/dtos/response-dto');

const PostJobService = require('../services/post-job-services/post-job-service');
const UserService = require('../services/user-services/user-services');
const GuildsService = require('../services/guilds-service/guilds-service');

const PostJobDTO = require('../dtos/post-job-dto');
const UserCredentialsDTO = require('../dtos/user-credentials-dto');
const GuildConfigurationDTO = require('../dtos/guild-configuration-dto');

const $LABEL = 'MasterController'

class MasterController {

    static registerUser(request, response) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserCredentialsDTO(request.body);

        return UserService.registerUser(payload)
            .then(_response => {
                console.log(`${$LOG_LABEL} user credentials saved in DB: `, { _response });
                return response.status(200).json(new ResponseDTO());
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} failed to save user credentials: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            });
    }

    static postJob(request, response) {
        const $JOB_LABEL = 'postJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new PostJobDTO(request.body);

        return PostJobService.saveJob(payload)
            .then(_response => {
                PostJobService.makePost(payload)
                    .then(__response => {
                        console.log(`${$LOG_LABEL} message sent on discord and saved in DB: `, { __response });
                        return response.status(200).json(new ResponseDTO());
                    })
                    .catch(error => {
                        console.error(`${$LOG_LABEL} message failed to send on discord: `, { error });
                        return response.status(400).json(new ErrorDTO(error));
                    });
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} message failed to save in DB: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            });
    }

    static addChannelOrServer(request, response) {
        const $JOB_LABEL = 'addChannelOrServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new GuildConfigurationDTO(request.body);

        return GuildsService.saveGuildConfiguration(payload)
            .then(_response => {
                return PostJobService.sendResponseToDiscordServer(_response, payload.channel_id)
                    .then(__response => {
                        console.log(`${$LOG_LABEL} channel/guild configuration saved: `, { __response });
                        return response.status(200).json(new ResponseDTO());
                    })
                    .catch(error => {
                        console.error(`${$LOG_LABEL} failed to send response message: `, { error });
                        return response.status(400).json(new ErrorDTO(error));
                    })
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} channel/guild configuration failed to save: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            });
    }

    static removeChannel(request, response) {
        const $JOB_LABEL = 'removeChannel', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }

    static registerServer(request, response) {
        const $JOB_LABEL = 'registerServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
    }

    static removeServer(request, response) {
        const $JOB_LABEL = 'removeServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
    }
}

module.exports = MasterController;
