const getUtil = require('src/commons/getUtil');

const UserRepository = require('../../repositories/user-credentials-repository');

const FindByOneField = require('../common-object-builders/filters/find-by-one-field');
const FindByManyFields = require('../common-object-builders/filters/find-by-many-fields');

const UpdateUserCredentials = require('./object-builders/query/update-user-credentials');

const $LABEL = 'UserServices';

class UserServices {

    static registerUser(payload) {
        const $JOB_LABEL = 'registerUser', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;

        return new Promise((resolve, reject) => {
            return UserServices.checkIfUserExists(payload)
                .then(response => {
                    if (response) {
                        return UserServices.updateUserCredentials(payload)
                            .then(_response => {
                                console.log(`${$LOG_LABEL} user credentials udpated: `, { _response });
                                return resolve(_response);
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} failed to update user credentials: `, { error });
                                return reject(error);
                            });
                    } else {
                        return UserRepository.saveUser(payload)
                            .then(_response => {
                                console.log(`${$LOG_LABEL} user credentials saved: `, { _response });
                                return resolve(_response);
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} failed to save user credentials: `, { error });
                                return reject(error);
                            });
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} user credentials search failed: `, { error });
                    return reject(error);
                });
        });
    }

    static checkIfUserExists(payload) {
        const $JOB_LABEL = 'checkIfUserExists', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FindByManyFields([payload.user_id, payload.discord_user_id]);

        return new Promise((resolve, reject) => {
            return UserRepository.getUser(filter)
                .then(response => {
                    if (getUtil.isObjectWithKeys(response)) {
                        return resolve(1);
                    } else {
                        return resolve(0);
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} user credentials search failed: `, { error });
                    return reject(error);
                });
        });
    }

    static updateUserCredentials(payload) {
        const $JOB_LABEL = 'updateUserCredentials', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FindByManyFields([payload.user_id, payload.discord_user_id]);
        const query = new UpdateUserCredentials(payload);

        return new Promise((resolve, reject) => {
            return UserRepository.updateUser(filter, query)
                .then(response => {
                    console.log(`${$LOG_LABEL} user credentials updated: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to update user credentials: `, { error })
                    return reject(error);
                });
        });
    }

    static getOneUserByField(field) {
        const $JOB_LABEL = 'getOneUserByField', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FindByOneField(field);

        return new Promise((resolve, reject) => {
            return UserRepository.getUser(filter)
                .then(response => {
                    console.log(`${$LOG_LABEL} user found: `, { response });
                    return resolve(response);
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user: `, { error })
                    return reject(error);
                })
        });
    }
}

module.exports = UserServices;
