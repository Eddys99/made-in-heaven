const axios = require('axios');
const Url = require('url');

const SendToMaster = require('src/commons/services/discord-service/send-to-master');
const FormDataDTO = require('src/commons/dtos/form-data-dto.js');
const HeadersDTO = require('src/commons/dtos/headers-dto.js');
const UserCredentialsDTO = require('src/commons/dtos/user-credentials-dto.js');

const MessageDTO = require('./dtos/message-dto');
const SendMessageAxiosConfig = require('./dtos/send-message-axios-config');

const $LABEL = 'DiscordServices';

class DiscordService {

    static authenticateUser(code) {
        const $JOB_LABEL = 'authenticateUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO();
        const formData = new Url.URLSearchParams(new FormDataDTO('authenticateUser', code));

        return new Promise((resolve, reject) => {
            if (code) {
                return axios.post('https://discord.com/api/v10/oauth2/token', formData.toString(), headers)
                    .then(response => {
                        return DiscordService.getDiscordUserCredentials(response.data.access_token)
                            .then(_response => {
                                const payload = new UserCredentialsDTO('test_uid', _response.id, response.data);

                                return SendToMaster.registerUser(payload)
                                    .then(_response => {
                                        console.log(`${$LOG_LABEL} Credentials sent to Master-Worker: `, { _response });
                                        return resolve(_response);
                                    })
                                    .catch(error => {
                                        console.error(`${$LOG_LABEL} Couldn't sent to Master-Worker: `, { error });
                                        return reject(error);
                                    });
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} discord user's credentials search failed: `, { error });
                                return reject(error);
                            });
                    })
                    .catch(error => {
                        console.error(`${$LOG_LABEL} Authentication failed`, { error });
                        return reject(error);
                    });
            } else {
                console.error(`${$LOG_LABEL} Something went wrong with "code": `, { code });
                return reject({ error: "{ code } is invalid"});
            }
        });
    }

    static refreshToken(refresh_token) {
        const $JOB_LABEL = 'refreshToken', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO();
        const formData = new Url.URLSearchParams(new FormDataDTO('refreshToken', refresh_token));

        return new Promise((resolve, reject) => {
            return axios.post('https://discord.com/api/v10/oauth2/token', formData.toString(), headers)
                .then(result => {
                    console.log(`${$LOG_LABEL} User's tokens refreshed: `, { result });
                    return resolve(result.data);

                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} Couldn't refresh user's tokens: `, { error });
                    return reject(error);
                });
        });
    }

    static retrieveDiscordServers(access_token) {
        const $JOB_LABEL = 'retrieveDiscordServers', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO('Authorization', access_token);

        return new Promise((resolve, reject) => {
            return axios.get(`https://discord.com/api/v10/users/@me/guilds`, headers)
                .then(response => {
                    console.log(`${$LOG_LABEL} discord servers found: `, { response });
                    const result = response.data.map((element) => {
                        return {
                            id: element.id,
                            name: element.name,
                            icon: element.icon
                        };
                    });
                    return resolve(result);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} discord servers not found: `, { error });
                    return reject(error);
                });
        });
    }

    static revokeToken(access_token) {
        const $JOB_LABEL = 'revokeToken', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO();
        const formData = new Url.URLSearchParams(new FormDataDTO('revokeToken', access_token));

        return new Promise((resolve, reject) => {
            return axios.post('https://discord.com/api/v10/oauth2/token/revoke', formData.toString(), headers)
                .then(result => {
                    console.log(`${$LOG_LABEL} user logged out: `, { result });
                    return resolve(result);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} log out user error: `, { error });
                    return reject(error);
                });
        });
    }

    static getDiscordUserCredentials(access_token) {
        const $JOB_LABEL = 'getDiscordUserCredentials', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO('Authorization', access_token);

        return new Promise((resolve, reject) => {
            return axios.get('https://discord.com/api/v10/users/@me', headers)
                .then(response => {
                    console.log(`${$LOG_LABEL} user found `, { response });
                    return resolve(response.data);
                }).catch(error => {
                    console.error(`${$LOG_LABEL} Can't find user: `, { error });
                    return reject(error);
                });
        });
    }

    static sendMessageToDiscord(payload, target_channels) {
        const $JOB_LABEL = 'sendMessageToDiscord', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const message_object = new MessageDTO(payload);

        target_channels.forEach((element) => {
            const axios_config = new SendMessageAxiosConfig(element.channel_id, message_object);
            axios(axios_config)
                .then(response => {
                    console.log(`${$LOG_LABEL} Message sent to Discord channel: `, { response });
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} Couldn't send message to Discord channel: `, { error });
                });
        });
    }
}

module.exports = DiscordService;
