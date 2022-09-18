const getUtil = require('src/commons/getUtil');

const GuildsRepository = require('../../repositories/guilds-repository');

const FilterByOneField = require('./object-builders/filters/find-by-one-field');
const FilterByTwoFields = require('./object-builders/filters/find-by-two-fields');
const FindByManyFields = require('./object-builders/filters/find-by-many-fields');

const AddChannelToList = require('./object-builders/queries/add-channel-to-list');

const $LABEL = 'GuildsService';

class GuildsService {

    static saveGuildConfiguration(payload) {
        const $JOB_LABEL = 'saveGuildConfiguration', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildsService.checkIfConfigurationExists([payload.discord_user_id, payload.server_id])
                .then(response => {
                    if (response) {
                        return GuildsService.checkIfChannelExists([payload.discord_user_id, payload.channel_id])
                            .then(_response => {
                                if (_response) {
                                    console.error(`${$LOG_LABEL} configuration already exists: `, { payload });
                                    return reject('channel is already registered.');
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
                                console.log(`${$LOG_LABEL} guild configuration registered: `, { response });
                                return resolve('Server and channel registered');
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
        const filter = new FindByManyFields([payload.discord_user_id, payload.server_id]);
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
        const filter = new FilterByTwoFields('user_id', 'server_id', payload);

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
        const filter = new FindByManyFields(payload);

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
        const filter = new FindByManyFields(payload);

        return new Promise((resolve, reject) => {
            return GuildsRepository.getOneGuild(filter)
                .then(response => {
                    if (!getUtil.isObjectWithKeys(response)) {
                        console.log(`${$LOG_LABEL} channel doesn't exists: `, { response });
                        return resolve(0);
                    } else {
                        console.log(`${$LOG_LABEL} channel exists: `, { response });
                        return resolve(1);
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user channel: `, { error });
                    return reject(error);
                });
        });
    }
}

module.exports = GuildsService;
