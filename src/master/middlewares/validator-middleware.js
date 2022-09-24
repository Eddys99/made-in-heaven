const getUtil = require('src/commons/getUtil');
const ErrorDTO = require('src/commons/dtos/error-dto.js');

const PostJobDTO = require('../dtos/post-job-dto');
const UserCredentialsDTO = require('../dtos/user-credentials-dto');
const GuildConfigurationDTO = require('../dtos/guild-configuration-dto');
const RemoveConfigurationDTO = require('../dtos/remove-configuration-dto');

const $LABEL = 'ValidatorMiddleware';

class ValidatorMiddleware {

    static registerUser(request, response, next) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserCredentialsDTO(request.body);
        const string_fields = [
            'user_uid',
            'access_token',
            'token_type',
            'refresh_token',
            'scope'
        ];
        const number_fields = [
            'expires_in'
        ]
        const errors = [
            ...checkIfValuesAreMissing(string_fields, payload),
            ...checkIfValuesAreMissing(number_fields, payload, 'number')
        ];

        if (errors.length > 0) {
            console.error(`${$LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
            return response.json(new ErrorDTO(errors));
        }

        return next();
    }

    static postJob(request, response, next) {
        const $JOB_LABEL = 'postJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new PostJobDTO(request.body);
        const string_fields = [
            'user_uid'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        if (errors.length > 0) {
            console.error(`${$LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
            return response.json(new ErrorDTO(errors));
        }

        return next();
    }

    static addChannel(request, response, next) {
        const $JOB_LABEL = 'addChannel', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new GuildConfigurationDTO(request.body);
        const string_fields = [
            'discord_user_id',
            'server_id',
            'server_name',
            'owner_id',
            'channel_id',
            'channel_name'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        if (errors.length > 0) {
            console.error(`${$LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
            return response.json(new ErrorDTO(errors));
        }

        return next();
    }

    static removeChannel(request, response, next) {
        const $JOB_LABEL = 'removeChannel', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new RemoveConfigurationDTO(request.body);
        const string_fields = [
            'discord_user_id',
            'server_id',
            'channel_id'
        ];

        const errors = checkIfValuesAreMissing(string_fields, payload);

        if (errors.length > 0) {
            console.error(`${$LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
            return response.json(new ErrorDTO(errors));
        }

        return next();
    }

    static registerServer(request, response, next) {
        const $JOB_LABEL = 'registerServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new GuildConfigurationDTO(request.body);
        const string_fields = [
            'discord_user_id',
            'server_id',
            'server_name',
            'owner_id'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        if (errors.length > 0) {
            console.error(`${$LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
            return response.json(new ErrorDTO(errors));
        }

        return next();
    }

    static removeServer(request, response, next) {
        const $JOB_LABEL = 'removeServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new RemoveConfigurationDTO(request.body);
        const string_fields = [
            'server_id'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        if (errors.length > 0) {
            console.error(`${$LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
            return response.json(new ErrorDTO(errors));
        }

        return next();
    }
}

function checkIfValuesAreMissing(important_fields, payload, data_type = 'string') {
    const errors = [];
    let isValid;

    switch (data_type.toLowerCase()) {
        case 'boolean':
            isValid = getUtil.isBoolean;
            break;
        case 'number':
            isValid = getUtil.isNumber;
            break;
        case 'object':
            isValid = getUtil.isObject;
            break;

        default:
            isValid = getUtil.isNotEmptyString;
            break;
    }

    important_fields.forEach(field => {
        if (payload[field] === undefined) {
            errors.push(`[${field}] is missing`);
        } else if (!isValid(payload[field])) {
            errors.push(`[${field}] has to be a ${data_type}`);
        }
    });

    return errors;
}

module.exports = ValidatorMiddleware;