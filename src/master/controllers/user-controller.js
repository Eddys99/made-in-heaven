const passport = require('passport');

const getUtil = require('src/commons/getUtil');
const ErrorDTO = require('src/commons/dtos/error-dto');
const ResponseDTO = require('src/commons/dtos/response-dto');

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
                return response.status(200).json(new ResponseDTO());
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

    static authenticate(request, response, next) {
        const $JOB_LABEL = 'authenticate', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return passport.authenticate("local",
            { usernameField: 'username', passwordField: 'password' },
            (error, user, info) => {
                if (error) {
                    console.error(`${$LOG_LABEL} passport auth error: `, { error });
                    return response.status(400).json(new ErrorDTO(error));
                }
                if (!user) {
                    return response.status(401).json({ msg: "User doesn't exists"});
                }
                else {
                    return request.logIn(user, (_error) => {
                        if (_error) {
                            console.error(`${$LOG_LABEL} request.logIn _error: `, { _error });
                            return response.status(400).json(new ErrorDTO(_error));
                        } else {
                            console.log(`${$LOG_LABEL} user logged: `, request.user.username);
                            return response.status(200).json(new ResponseDTO("Successfully Authenticated"));
                        }
                    });
                }
            }) (request, response, next);
    }

    static logout(request, response) {
        const $JOB_LABEL = 'logout', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return request.logOut(error => {
            if (error) {
                return response.status(400).json({ msg: 'Logout failed.' });
            } else {
                console.log(`${$LOG_LABEL} logout done.`);
                return response.status(200).json({ msg: 'Logout done.' });
            }
        });
    }
}

module.exports = UserController;
