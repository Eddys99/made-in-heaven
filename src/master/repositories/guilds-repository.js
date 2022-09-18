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
            GuildModel.find(filter, null, null, (error, response) => {
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
            GuildModel.findOne(filter, null, null, (error, response) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to get guild: `, { error });
                    return reject(error);
                } else {
                    console.log(`${$LOG_LABEL} guild found: `, { response });
                    return resolve(response);
                }
            });
        });
    }

    static updateGuild(filter, query) {
        const $JOB_LABEL = 'getOneGuild', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            GuildModel.updateOne(filter, query, null, (error, result) => {
                if (error) {
                    console.error(`${$LOG_LABEL} failed to update guild configuration: `, { error });
                    return reject(error);
                } else {
                    console.log(`${$LOG_LABEL} guild configuration updated: `, { result });
                    return resolve(result);
                }
            });
        });
    }
}

module.exports = GuildsRepository;
