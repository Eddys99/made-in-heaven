const getUtil = require('src/commons/getUtil');
const ErrorDTO = require('src/commons/dtos/error-dto');
const ResponseDTO = require('src/commons/dtos/response-dto');

const UserAccountService = require('../services/user-account-service/user-account-service');

const CreateAccountDTO = require('../dtos/create-account-dto');
const GetUserDTO = require('../dtos/get-user-dto');

const $LABEL = 'UserController';

class UserController {

    static register(request, response) {
        const $JOB_LABEL = 'register', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        let payload = new CreateAccountDTO(request.body);
        payload.encryptPassword(request.body);

        return UserAccountService.registerUserAccount(payload)
            .then(_response => {
                console.log(`${$LOG_LABEL} user registered.`);
                return response.status(200).json(new ResponseDTO());
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} failed to register user.`, { error });
                if (getUtil.isNotEmptyString(error)) {
                    return response.status(200).json(error);
                } else {
                    return response.status(400).json(new ErrorDTO(null, "Something went wrong"));
                }
            })
    }

    static getUserForAuthentication(request, response) {
        const $JOB_LABEL = 'getUserForAuthentication', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new GetUserDTO(request.body);

        return UserAccountService.getUser(payload)
            .then(_response => {
                return response.status(200).json(response);
            })
            .catch(error => {
                return response.status(400).json(new ErrorDTO(error));
            });
    }
}

module.exports = UserController;
