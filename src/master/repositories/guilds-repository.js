const GuildModel = require('../models/guilds');

const $LABEL = 'GuildsRepository';

class GuildsRepository {

    static saveGuild(data) {
        const $JOB_LABEL = 'saveGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newJob = new GuildModel(data);

            return newJob.save()
                .then(item => resolve(newJob))
                .catch(error => {
                    console.error(`${$LOG_LABEL} guild configuration failed to save: `, { error });
                    return reject(error);
                });
        });
    }

    static getGuilds(filter) {
        const $JOB_LABEL = 'getGuilds', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.find(filter, null, null)
                .then(response => {
                    console.log(`${$LOG_LABEL} guilds found: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get guilds: `, { error });
                    return reject(error);
                });
        });
    }

    static getOneGuild(filter) {
        const $JOB_LABEL = 'getOneGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.findOne(filter, null, null)
                .then(response => resolve(response))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get guild: `, { error });
                    return reject(error);
                });
        });
    }

    static updateGuild(filter, query) {
        const $JOB_LABEL = 'getOneGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.updateOne(filter, query, null)
                .then(response => resolve(response))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to update guild configuration: `, { error });
                    return reject(error);
                });
        });
    }

    static updateManyGuilds(filter, query) {
        const $JOB_LABEL = 'updateManyGuilds', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.updateMany(filter, query, null)
                .then(result => resolve(result))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to update guild configuration: `, { error });
                    return reject(error);
                });
        });
    }

    static removeMany(filter) {
        const $JOB_LABEL = 'removeMany', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.deleteMany(filter, null)
                .then(result => resolve(result))
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to remove guilds: `, { error });
                    return reject(error);
                });
        });
    }
}

module.exports = GuildsRepository;
