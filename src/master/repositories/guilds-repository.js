const GuildModel = require('../models/guilds');

const $LABEL = 'GuildsRepository';

class GuildsRepository {

    static saveGuild (data) {
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
        })
    }
}

module.exports = GuildsRepository;
