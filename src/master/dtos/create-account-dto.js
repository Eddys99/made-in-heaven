const bcrypt = require('bcrypt');

const $LABEL = 'CreateAccountDTO';

class CreateAccountDTO {
    constructor(data, toValidator = false) {
        this.username = data.username;
        this.email = data.email;

        if (toValidator) {
            this.password = data.password;
            this.password2 = data.password2;
        } else {
            this.user_id = `${data.username}_${Date.now()}`;
        }
    }

    encryptPassword(data) {
        const $JOB_LABEL = 'encryptPassword', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`
        const saltRounds = 10;

        return bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) {
                console.log(`${$LOG_LABEL} error: `, { error });
                return error;
            } else {
                return bcrypt.hash(data.password, salt, (_error, hash) => {
                    if (_error) {
                        console.log(`${$LOG_LABEL} _error: `, { _error });
                        return _error;
                    } else {
                        this.password = hash;
                    }
                });
            }
        });
    }
}

module.exports = CreateAccountDTO;
