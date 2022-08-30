const axios = require('axios');
const Url = require('url');

const FormDataDTO = require('src/commons/dtos/form-data-dto.js');
const ErrorDTO = require('src/commons/dtos/error-dto.js');
const HeadersDTO = require('src/commons/dtos/headers-dto.js');
const HTTPRequestService = require("../http-request-service");

const $LABEL = 'DiscordServices';

class DiscordService {

    static authenticateUser(code) {
        const $JOB_LABEL = 'authenticateUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const headers = new HeadersDTO();
        const formData = new Url.URLSearchParams(new FormDataDTO('authenticateUser', code));

        return new Promise((resolve, reject) => {
            if (code) {
                return axios.post('https://discord.com/api/v10/oauth2/token', formData.toString(), headers)
                    .then(_response => {
                        const payload = new UserCredentialsDTO('test_uid', _response.data);
                        return HTTPRequestService.makeRequest(`http://localhost:3035/register-user`, payload, null, (error, result) => {
                            if (error) {
                                Logger.error(`${$LOG_LABEL} request failed`, new ErrorDTO(error));
                                return reject(error);
                            } else {
                                Logger.debug(`${$LOG_LABEL} request done`, result);
                                return resolve(result);
                            }
                        });
                    })
                    .catch(error => {
                        Logger.error(`${$LOG_LABEL} Authentication failed`, new ErrorDTO(error));
                        return reject(error);
                    });
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
                    Logger.debug(`${$LOG_LABEL} User's tokens refreshed: `, result.data);
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
                    Logger.debug(`${$LOG_LABEL} discord servers found: `, _response.data);
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
                    Logger.debug(`${$LOG_LABEL} user logged out: `, result);
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
                Logger.debug(`${$LOG_LABEL} user logged out: `, response.data);
                return resolve(response.data);
            }).catch(error => {
                Logger.error(`${$LOG_LABEL} Can't find user: `, new ErrorDTO(error));
                return reject(error);
            });
        });
    }
}

module.exports = DiscordService;
