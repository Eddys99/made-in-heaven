const axios = require('axios');
const Url = require('url');

const Logger = require('src/commons/logger/logger-config');

const SendToMaster = require('src/commons/services/discord-service/send-to-master');
const FormDataDTO = require('src/commons/dtos/form-data-dto.js');
const ErrorDTO = require('src/commons/dtos/error-dto.js');
const ResponseDTO = require('src/commons/dtos/response-dto');
const HeadersDTO = require('src/commons/dtos/headers-dto.js');
const UserCredentialsDTO = require('src/commons/dtos/user-credentials-dto.js');

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
                        const payload = new UserCredentialsDTO('test_uid', response.data);

                        return SendToMaster.registerUser(payload)
                            .then(_response => {
                                Logger.debug(`${$LOG_LABEL} Credentials sent to Master-Worker: `, new ResponseDTO());
                            })
                            .catch(error => {
                                Logger.error(`${$LOG_LABEL} Couldn't sent to Master-Worker: `, new ErrorDTO(error));
                            });
                    })
                    .catch(error => {
                        Logger.error(`${$LOG_LABEL} Authentication failed`, new ErrorDTO(error));
                        return reject(error);
                    });
            } else {
                Logger.error(`${$LOG_LABEL} Something went wrong with "code": `, new ErrorDTO(code));
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
                    Logger.debug(`${$LOG_LABEL} User's tokens refreshed: `, new ResponseDTO());
                    return resolve(result.data);

                })
                .catch(error => {
                    Logger.error(`${$LOG_LABEL} Couldn't refresh user's tokens: `, new ErrorDTO(error));
                    return reject(error);
                });
        });
    }

    static retrieveDiscordServers(access_token) {
        const $JOB_LABEL = 'retrieveDiscordServers', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO(access_token);

        return new Promise((resolve, reject) => {
            return axios.get(`https://discord.com/api/v10/users/@me/guilds`, headers)
                .then(_response => {
                    Logger.debug(`${$LOG_LABEL} discord servers found: `, new ResponseDTO());
                    const result = _response.data.map((element) => {
                        return {
                            id: element.id,
                            name: element.name,
                            icon: element.icon
                        };
                    });
                    return resolve(result);
                })
                .catch(error => {
                    Logger.error(`${$LOG_LABEL} discord servers not found: `, new ErrorDTO(error));
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
                    Logger.debug(`${$LOG_LABEL} user logged out: `, new ResponseDTO());
                    return resolve(result);
                })
                .catch(error => {
                    Logger.error(`${$LOG_LABEL} log out user error: `, new ErrorDTO(error));
                    return reject(error);
                });
        });
    }

    static getDiscordUserCredentials(access_token) {
        const $JOB_LABEL = 'getDiscordUserCredentials', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO(access_token);

        return new Promise((resolve, reject) => {
            return axios.get('https://discord.com/api/v10/users/@me', headers).then(response => {
                Logger.debug(`${$LOG_LABEL} user logged out: `, new ResponseDTO());
                return resolve(response.data);
            }).catch(error => {
                Logger.error(`${$LOG_LABEL} Can't find user: `, new ErrorDTO(error));
                return reject(error);
            });
        });
    }
}

module.exports = DiscordService;
