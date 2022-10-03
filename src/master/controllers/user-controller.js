const getUtil = require('src/commons/getUtil');

const UserAccountService = require('../services/user-account-service/user-account-service');


const CreateAccountDTO = require('../dtos/create-account-dto');
const UserAuthenticationDTO = require('../dtos/user-authentication-dto');

const $LABEL = 'UserController';

class UserController {

    static register(request, response) {
        const $JOB_LABEL = 'register', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        let payload = new CreateAccountDTO(request.body);
        payload.encryptPassword(request.body);

        return UserAccountService.registerUserAccount(payload)
            .then(_response => {
                console.log(`${$LOG_LABEL} user registered.`);
                return response.status(200).json(_response);
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} failed to register user.`, { error });
                if (getUtil.isNotEmptyString(error)) {
                    return response.status(200).json(error);
                } else {
                    return response.status(400).json({ msg: "Something went wrong" });
                }
            })
    }

    static authenticate(request, response) {
        const $JOB_LABEL = 'authenticate', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const payload = new UserAuthenticationDTO(request.body);

        return UserAccountService.authentication(payload)
            .then(_response => {
                console.log(`${$LOG_LABEL} user authenticated.`);
                return response.status(200).json({ msg: 'Authenticated successfully' });
            })
            .catch(error => {
                console.error(`${$LOG_LABEL} authentication failed: `, { error });
                return response.status(400).json(error);
            })
    }
}

module.exports = UserController;
