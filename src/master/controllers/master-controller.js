const ErrorDTO = require('src/commons/dtos/error-dto.js');
const ResponseDTO = require('src/commons/dtos/response-dto');

const PostJobService = require('../services/post-job-service/post-job-service');
const UserService = require('../services/user-service/user-services');
const GuildsService = require('../services/guilds-service/guilds-service');

const PostJobDTO = require('../dtos/post-job-dto');
const UserCredentialsDTO = require('../dtos/user-credentials-dto');
const GuildConfigurationDTO = require('../dtos/guild-configuration-dto');
const RemoveConfigurationDTO = require('../dtos/remove-configuration-dto');

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

     static async addChannel(request, response) {
        const $JOB_LABEL = 'addChannel', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const user_id = await getUserId(request.body.discord_user_id);
        const payload = new GuildConfigurationDTO(request.body, user_id);

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
                    });
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} channel/guild configuration failed to save: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            });
    }

    static removeChannel(request, response) {
        const $JOB_LABEL = 'removeChannel', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new RemoveConfigurationDTO(request.body);
        const response_msg_string = 'channel removed';

        return GuildsService.removeTargetChannel(payload)
            .then(_response => {
                return PostJobService.sendResponseToDiscordServer(response_msg_string, payload.channel_id)
                    .then(__response => {
                        console.log(`${$LOG_LABEL} channel/guild configuration removed: `, { __response });
                        return response.status(200).json(new ResponseDTO());
                    })
                    .catch(error => {
                        console.error(`${$LOG_LABEL} failed to send response message: `, { error });
                        return response.status(400).json(new ErrorDTO(error));
                    });
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} target channel removed: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            });
    }

    static async registerServer(request, response) {
        const $JOB_LABEL = 'registerServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const user_id = await getUserId(request.body.discord_user_id);
        const payload = new GuildConfigurationDTO(request.body, user_id);
        console.log(`${$LOG_LABEL} bot joined server with id: `, payload.server_id);

        return GuildsService.registerNewServer(payload)
            .then(_response => {
                console.log(`${$LOG_LABEL} server registered: `, { _response });
                return response.status(200).json(new ResponseDTO());
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} failed to register server: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            });
    }

    static removeServer(request, response) {
        const $JOB_LABEL = 'removeServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new RemoveConfigurationDTO(request.body);

        return GuildsService.removeGuildFromAll(payload)
            .then(_response => {
                console.log(`${$LOG_LABEL} server removed from all users list: `, { _response });
                return response.status(200).json(new ResponseDTO());
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} failed to remove server from all users list: `, { error });
                return response.status(400).json(new ErrorDTO(error));
            })
    }
}

async function getUserId(discord_user_id) {
    const $JOB_LABEL = 'getUserId', $LOG_LABEL = `[${$LABEL}][handler][${$JOB_LABEL}]`;

    return UserService.getOneUserByField(discord_user_id)
        .then(response => {
            console.log(`${$LOG_LABEL} user_id found: `, response.user_id);
            return response.user_id;
        })
        .catch(error => {
            console.log(`${$LOG_LABEL} failed to get user_id: `, { error });
            return error;
        });
}

module.exports = MasterController;
