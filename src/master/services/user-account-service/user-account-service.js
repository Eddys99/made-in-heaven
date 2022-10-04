const bcrypt = require('bcrypt');

const getUtil = require('src/commons/getUtil');

const UserAccountRepository = require('../../repositories/user-account-repository');

const FilterByOne = require('../common-object-builders/filters/filter-by-one-field');
const FilterByMany = require('../common-object-builders/filters/filter-by-many-fields');

const $LABEL = 'UserAccountService';

class UserAccountService {

    static registerUserAccount(payload) {
        const $JOB_LABEL = 'registerUserAccount', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        const filter = new FilterByOne('username', payload.username);

        return new Promise((resolve, reject) => {
            return UserAccountRepository.getUser(filter)
                .then(response => {
                    if (getUtil.isObjectWithKeys(response)) {
                        console.log(`${$LOG_LABEL} username is already used: `, payload.username)
                        return reject('Username is already used.');
                    } else {
                        const _filter = new FilterByOne('email', payload.email);
                        return UserAccountRepository.getUser(_filter)
                            .then(_response => {
                                if (getUtil.isObjectWithKeys(_response)) {
                                    console.log(`${$LOG_LABEL} email is already used: `, payload.username)
                                    return reject('Email is already used.');
                                } else {
                                    return UserAccountRepository.saveUser(payload)
                                        .then(__response => {
                                            console.log(`${$LOG_LABEL} user registered.`)
                                            return resolve('Registered successfully.')
                                        })
                                        .catch(error => {
                                            console.log(`${$LOG_LABEL} failed to register user: `, { error });
                                            return reject(error);
                                        })
                                }
                            })
                            .catch(error => {
                                console.error(`${$LOG_LABEL} failed to get user by email: `, { error });
                                return reject(error);
                            });
                    }
                })
                .catch(error => {
                    console.error(`${$LOG_LABEL} failed to get user by username: `, { error });
                    return reject(error);
                });
        });
    }
}

module.exports = UserAccountService;
