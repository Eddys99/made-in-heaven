const ErrorDTO = require('src/commons/dtos/error-dto.js');

const $LABEL = 'Discord-Proxy-Controller'

class DiscordProxyController {

    static handleAuthorize(request, response) {
        const $JOB_LABEL = 'handleAuthorize', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }

    static handleRefreshToken(request, response) {
        const $JOB_LABEL = 'handleRefreshToken', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }

    static handleRevokeToken(request, response) {
        const $JOB_LABEL = 'handleRevokeToken', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

    }
}

module.exports = DiscordProxyController;
