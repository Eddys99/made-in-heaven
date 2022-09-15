const DiscordService = require('src/commons/services/discord-service/discord-service.js');

const $LABEL = 'Discord-Proxy-Controller'

class DiscordProxyController {

    static handleAuthorize(request, response) {
        const $JOB_LABEL = 'handleAuthorize', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const { code } = request.query;

        return DiscordService.authenticateUser(code)
            .then(_response => {
                console.log(`${$LOG_LABEL} Authentication done`, { _response });
                return response.sendStatus(200);
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} Authentication failed`, { error });
                return response.sendStatus(400);
            });
    }

    static handleRefreshToken(request, response) {
        const $JOB_LABEL = 'handleRefreshToken', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }

    static handleRevokeToken(request, response) {
        const $JOB_LABEL = 'handleRevokeToken', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }
}

module.exports = DiscordProxyController;
