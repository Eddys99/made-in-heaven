
const $LABEL = 'Master-Controller'

class MasterController {

    static testGet(require, response) {
        const $JOB_LABEL = 'testGet', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        console.info(`${$LOG_LABEL}: works !`);

        return response.json("Works");
    }

    static testPost(require, response) {
        const $JOB_LABEL = 'testPost', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = require.body;
        console.info(`${$LOG_LABEL}: payload`, payload);

        return response.json({ payload });
    }
}

module.exports = MasterController;
