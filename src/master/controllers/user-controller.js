const CreateAccountDTO = require('../dtos/create-account-dto');

const $LABEL = 'UserController';

class UserController {

    static register(request, response) {
        const $JOB_LABEL = 'register', $LOG_LABEL = `[${$LABEL}][handler][${$JOB_LABEL}]`;
        const payload = new CreateAccountDTO(request.body);

    }

    static authenticate(request, response) {
        const $JOB_LABEL = 'authenticate', $LOG_LABEL = `[${$LABEL}][handler][${$JOB_LABEL}]`;

    }
}

module.exports = UserController;
