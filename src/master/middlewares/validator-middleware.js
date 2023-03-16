const getUtil = require('src/commons/getUtil');
const ErrorDTO = require('src/commons/dtos/error-dto.js');

const PostJobDTO = require('../dtos/post-job-dto');
const UserCredentialsDTO = require('../dtos/user-credentials-dto');
const GuildConfigurationDTO = require('../dtos/guild-configuration-dto');
const RemoveConfigurationDTO = require('../dtos/remove-configuration-dto');
const UserAccountDTO = require('../dtos/create-account-dto');
const UserAuthenticationDTO = require('../dtos/user-authentication-dto');

const $LABEL = 'ValidatorMiddleware';

class ValidatorMiddleware {

    static registerUser(request, response, next) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserCredentialsDTO(request.body);
        const string_fields = [
            'user_id',
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

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
    }

    static postJob(request, response, next) {
        const $JOB_LABEL = 'postJob', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new PostJobDTO(request.body);
        const string_fields = [
            'user_id'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
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

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
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

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
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

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
    }

    static removeServer(request, response, next) {
        const $JOB_LABEL = 'removeServer', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new RemoveConfigurationDTO(request.body);
        const string_fields = [
            'server_id'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
    }

    static userAccountRegister(request, response, next) {
        const $JOB_LABEL = 'userAccountRegister', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserAccountDTO(request.body, true);
        const string_fields = [
            'username',
            'email',
            'password',
            'password2'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : (payload.password !== payload.password2)
                ? response.status(400).json(new ErrorDTO("Passwords don't match."))
                : (!validateEmail(payload.email))
                    ? response.status(400).json(new ErrorDTO("This is not a valid email."))
                    : next();
    }

    static userAuthentication(request, response, next) {
        const $JOB_LABEL = 'userAuthentication', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserAuthenticationDTO(request.body);
        const string_fields = [
            'username',
            'password'
        ];
        const errors = checkIfValuesAreMissing(string_fields, payload);

        return (rejectOnEncounteredError(errors, $LOG_LABEL))
            ? response.status(400).json(new ErrorDTO(errors))
            : next();
    }
}

function rejectOnEncounteredError(errors = [], LOG_LABEL, payload) {
    if (errors.length > 0) {
        console.error(`${LOG_LABEL} Some credentials are missing: `, new ErrorDTO(errors));
        console.error(`${LOG_LABEL} Failed payload: `, payload);
        return true;
    } else {
        return false;
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
            isValid = getUtil.isObjectWithKeys;
            break;
        case 'array':
            isValid = getUtil.isArrayWithItems;
            break;

        default:
            isValid = getUtil.isNotEmptyString;
            break;
    }

    important_fields.forEach(field => {
        if (payload[field] === undefined) {
            errors.push(`[${field}] is missing`);
        } else if (!isValid(payload[field])) {
            errors.push(`[${field}] has to be a(n) ${data_type}`);
        }
    });

    return errors;
}

function checkIfValuesAreMissingV2(payload, data_structure) {
    let errors = [];

    data_structure.forEach(schema => {
        let isValid;
        let isValidSecond = (!getUtil.isNumber(payload[schema.name]) && !getUtil.isNotEmptyString(payload[schema.name]));

        switch (schema.type) {
            case 'boolean':
                isValid = getUtil.isBoolean;
                break;
            case 'number':
                isValid = getUtil.isNumber;
                break;
            case 'object':
                isValid = getUtil.isObjectWithKeys;
                break;
            case 'array':
                isValid = getUtil.isArrayWithItems;
                break;

            default:
                isValid = getUtil.isNotEmptyString;
                break;
        }

        const checkIfValueIsValid = (!Array.isArray(schema.type))
            ? (!isValid(payload[schema.name]))
            : (isValidSecond)

        if (payload[schema.name] === undefined || payload[schema.name] === null) {
            (schema.required === true)
                ? errors.push(`[${schema.name}] is missing`)
                : console.log(`[optional field][${schema.name}] is missing`);
        } else if (checkIfValueIsValid) {
            errors.push(`[${schema.name}] has to be a(n) ${schema.type}`);
        } else if (schema.type === "object" && Array.isArray(payload[schema.name])) {
            errors.push(`[${schema.name}] has to be a(n) ${schema.type}`);
        }

        if (getUtil.isArrayWithItems(schema.properties)) {
            (getUtil.isObjectWithKeys(payload[schema.name]) && !getUtil.isArrayWithItems(payload[schema.name]))
                ? errors = [...errors, ...checkIfValuesAreMissingV2(payload[schema.name], schema.properties)]
                : (getUtil.isArrayWithItems(payload[schema.name]))
                    ? errors = [...errors, ...checkArrayFields(payload[schema.name], schema.properties)]
                    : console.log(`[${schema.name}] is missing or has no properties`);
        }
    });

    return errors;
}

function checkArrayFields(payload, data_structure) {
    let errors = [];

    payload.forEach(element => {
        data_structure.forEach(schema => {
            let isValid;

            switch (schema.type) {
                case 'boolean':
                    isValid = getUtil.isBoolean;
                    break;
                case 'number':
                    isValid = getUtil.isNumber;
                    break;
                case 'object':
                    isValid = getUtil.isObjectWithKeys;
                    break;
                case 'array':
                    isValid = getUtil.isArrayWithItems;
                    break;

                default:
                    isValid = getUtil.isNotEmptyString;
                    break;
            }

            if (element[schema.name] === undefined || element[schema.name] === null) {
                (schema.required === true)
                    ? errors.push(`[${schema.name}] is missing`)
                    : console.log(`[optional field][${schema.name}] is missing`);
            } else if (!isValid(element[schema.name])) {
                errors.push(`[${schema.name}] has to be a(n) ${schema.type}`);
            }
        });
    });

    return errors;
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = ValidatorMiddleware;
