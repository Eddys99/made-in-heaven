const GuildsRepository = require('../../repositories/guilds-repository');

const FilterByOneField = require('./object-builders/filters/find-by-one-field');
const FilterByTwoField = require('./object-builders/filters/find-by-two-fields');

const $LABEL = 'GuildsService';

class GuildsService {

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
        const filter = new FilterByTwoField('user_id', 'server_id', payload);

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
}

module.exports = GuildsService;
