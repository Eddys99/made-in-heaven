const getUtil = require('src/commons/getUtil');

const GuildsRepository = require('../../repositories/guilds-repository');

const FilterByOneField = require('../common-object-builders/filters/filter-by-one-field');
const FilterByManyFields = require('../common-object-builders/filters/filter-by-many-fields');

const AddChannelToList = require('./object-builders/queries/add-channel-to-list');
const RemoveTargetChannel = require('./object-builders/queries/remove-target-channel');

const CheckIfConfigurationExistsDTO = require('./dtos/check-if-configuration-exists-dto');
const CheckIfChannelExistsDTO = require('./dtos/check-if-channel-exists-dto');

const $LABEL = 'GuildsService';

class GuildsService {

    static saveGuildConfiguration(payload) {
        const $JOB_LABEL = 'saveGuildConfiguration', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const checkIfConfigurationExistsDTO = new CheckIfConfigurationExistsDTO(payload.discord_user_id, payload.server_id);
        const checkIfChannelExistsDTO = new CheckIfChannelExistsDTO(payload.discord_user_id, payload.channel_id);

        return new Promise((resolve, reject) => {
            return GuildsService.checkIfConfigurationExists(checkIfConfigurationExistsDTO)
                .then(response => {
                    if (response) {
                        return GuildsService.checkIfChannelExists(checkIfChannelExistsDTO)
                            .then(_response => {
                                if (_response) {
                                    console.error(`${$LOG_LABEL} configuration already exists: `, { payload });
                                    return resolve('channel is already registered.');
                                } else {
                                    return GuildsService.addChannelToList(payload)
                                        .then(__response => {
                                            console.log(`${$LOG_LABEL} channel added to list: `, { payload });
                                            return resolve('channel registered.');
                                        })
                                        .catch(error => {
                                            console.error(`${$LOG_LABEL} failed to add channel to list: `, { error });
                                            return reject(error);
                                        });
                                }
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} failed to get user channel: `, { error });
                                return reject(error);
                            });
                    } else {
                        return GuildsRepository.saveGuild(payload)
                            .then(response => {
                                return GuildsService.addChannelToList(payload)
                                    .then(__response => {
                                        console.log(`${$LOG_LABEL} channel added to list: `, { payload, response });
                                        return resolve('channel registered.');
                                    })
                                    .catch(error => {
                                        console.error(`${$LOG_LABEL} failed to add channel to list: `, { error });
                                        return reject(error);
                                    });
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} guild configuration failed to register: `, { error });
                                return reject(error);
                            });
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user guild configuration: `, { error });
                    return reject(error);
                });
        });
    }

    static addChannelToList(payload) {
        const $JOB_LABEL = 'addChannelToList', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByManyFields({ discord_user_id: payload.discord_user_id, server_id: payload.server_id });
        const query = new AddChannelToList(payload);

        return new Promise((resolve, reject) => {
           return GuildsRepository.updateGuild(filter, query)
               .then(response => {
                   console.log(`${$LOG_LABEL} channel added to list: `, { response });
                   return resolve(response);
               })
               .catch(error => {
                   console.error(`${$LOG_LABEL} failed to add channel to list: `, { error });
                   return reject(error);
               });
        });
    }

    static getUsersGuilds(user_id) {
        const $JOB_LABEL = 'getUsersGuilds', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByOneField('user_id', user_id);

        return new Promise((resolve, reject) => {
            return GuildsRepository.getGuilds(filter)
                .then(response => {
                    console.log(`${$LOG_LABEL} user's guilds found: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user's guilds: `, { error });
                    return reject(error);
                })
        });
    }

    static getUsersTargetChannels(payload) {
        const $JOB_LABEL = 'getTargetChannels', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByManyFields({ discord_user_id: payload.discord_user_id, server_id: payload.server_id });

        return new Promise((resolve, reject) => {
            return GuildsRepository.getOneGuild(filter)
                .then(response => {
                    console.log(`${$LOG_LABEL} user's target channels found: `, response.target_channels);
                    return resolve(response.target_channels);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user's target channels: `, { error });
                    return reject(error);
                })
        });
    }

    static checkIfConfigurationExists(payload) {
        const $JOB_LABEL = 'checkIfConfigurationExists', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByManyFields(payload);

        return new Promise((resolve, reject) => {
            return GuildsRepository.getOneGuild(filter)
                .then(response => {
                    if (!getUtil.isObjectWithKeys(response)) {
                        console.log(`${$LOG_LABEL} guild configuration doesn't exists: `, { response });
                        return resolve(0);
                    } else {
                        console.log(`${$LOG_LABEL} guild configuration exists: `, { response });
                        return resolve(1);
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user guild configuration: `, { error });
                    return reject(error);
                });
        });
    }

    static checkIfChannelExists(payload) {
        const $JOB_LABEL = 'checkIfChannelExists', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByManyFields(payload);
        const channel_id = payload.channel_id;

        return new Promise((resolve, reject) => {
            return GuildsRepository.getOneGuild(filter)
                .then(response => {

                    response.target_channels.forEach((element) => {
                        if (element.channel_id === channel_id) {
                            return resolve(1);
                        }
                    })
                    return resolve(0);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user channel: `, { error });
                    return reject(error);
                });
        });
    }

    static removeTargetChannel(payload) {
        const $JOB_LABEL = 'removeConfiguration', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByManyFields({ discord_user_id: payload.discord_user_id, server_id: payload.server_id });
        const query = new RemoveTargetChannel(payload.channel_id);

        return new Promise((resolve, reject) => {
           return GuildsRepository.updateManyGuilds(filter, query)
               .then(response => {
                   console.log(`${$LOG_LABEL} target channel removed: `, { response });
                   return resolve(response);
               })
               .catch(error => {
                   console.error(`${$LOG_LABEL} failed to remove target channel: `, { error });
                   return reject(error);
               });
        });
    }

    static registerNewServer(payload) {
        const $JOB_LABEL = 'registerNewServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByManyFields({ discord_user_id: payload.discord_user_id, server_id: payload.server_id });

        return new Promise((resolve, reject) => {
            return GuildsRepository.getOneGuild(filter)
                .then(response => {
                    if (getUtil.isObjectWithKeys(response)) {
                        console.error(`${$LOG_LABEL} server already registered: `, { payload });
                        return reject('server already registered');
                    } else {
                        return GuildsRepository.saveGuild(payload)
                            .then(_response => {
                                console.log(`${$LOG_LABEL} server registered: `, { _response });
                                return resolve(_response);
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} failed to register server: `, { error });
                                return reject(error);
                            })
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to search guild: `, { error });
                    return reject(error);
                });
        });
    }

    static removeGuildFromAll(payload) {
        const $JOB_LABEL = 'removeGuildFromAll', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByOneField(payload.server_id);

        return new Promise((resolve, reject) => {
            return GuildsRepository.removeMany(filter)
                .then(response => {
                    console.log(`${$LOG_LABEL} guilds removed: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to remove guilds: `, { error });
                    return reject(error);
                });
        });
    }
}

module.exports = GuildsService;
