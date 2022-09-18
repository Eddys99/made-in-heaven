const axios = require('axios');

const DiscordService = require('src/commons/services/discord-service/discord-service');
const config = require('config');

const PostJobRepository = require('../../repositories/post-job-repository');

const GuildsService = require('../guilds-service/guilds-service');

const SavePostJob = require('./dtos/save-post-job');

const $LABEL = 'PostJobService';
const $BOT_TOKEN = config.DiscordConfig.token;

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
            return GuildsService.getUsersTargetChannels(payload)
                .then(response => {
                    DiscordService.sendMessageToDiscord(payload, response);
                    console.log(`${$LOG_LABEL} messages sent to target channels: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} couldn't sent messages on target channels: `, { error });
                    return reject(error);
                });
        });
    }

    static sendResponseToDiscordServer(message, server_id) {
        const $JOB_LABEL = 'makePost', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return axios.post({
                method: 'POST',
                url: `https://discord.com/api/v10/channels/${server_id}/messages`,
                headers: { 'Authorization': `Bot ${$BOT_TOKEN}` },
                data: message
            })
                .then(response => {
                    console.log(`${$LOG_LABEL} response message sent: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to sent response message: `, { error });
                    return reject(error);
                });
        });
    }
}

module.exports = PostJobService;
