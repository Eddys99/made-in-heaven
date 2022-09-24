const GuildModel = require('../models/guilds');

const $LABEL = 'GuildsRepository';

class GuildsRepository {

    static saveGuild(data) {
        const $JOB_LABEL = 'saveGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            const newJob = new GuildModel(data);

            return newJob.save((error, item) => {
                if (error) {
                    console.error(`${$LOG_LABEL} guild configuration failed to save: `, { error });
                    return reject(error);
                } else {
                    console.log(`${$LOG_LABEL} guild configuration saved: `, { item });
                    return resolve(newJob);
                }
            });
        });
    }

    static getGuilds(filter) {
        const $JOB_LABEL = 'getGuilds', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.find(filter, null, null, (error, response) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to get guilds: `, { error });
                    return reject(error);
                } else {
                    console.log(`${$LOG_LABEL} guilds found: `, { response });
                    return resolve(response);
                }
            });
        });
    }

    static getOneGuild(filter) {
        const $JOB_LABEL = 'getOneGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.findOne(filter, null, null, (error, response) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to get guild: `, { error });
                    return reject(error);
                } else {
                    return resolve(response);
                }
            });
        });
    }

    static updateGuild(filter, query) {
        const $JOB_LABEL = 'getOneGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.updateOne(filter, query, null, (error, result) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to update guild configuration: `, { error });
                    return reject(error);
                } else {
                    return resolve(result);
                }
            });
        });
    }

    static updateManyGuilds(filter, query) {
        const $JOB_LABEL = 'updateManyGuilds', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.updateMany(filter, query, null, (error, result) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to update guild configuration: `, { error });
                    return reject(error);
                } else {
                    return resolve(result);
                }
            });
        });
    }

    static removeMany(filter) {
        const $JOB_LABEL = 'removeMany', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return GuildModel.deleteMany(filter, null, (error, result) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to remove guilds: `, { error });
                    return reject(error);
                } else {
                    return resolve(result);
                }
            })
        });
    }
}

module.exports = GuildsRepository;
