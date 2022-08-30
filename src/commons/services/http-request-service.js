'use strict';

const request = require('request');

const setError = require('src/commons/setError');
const getUtil = require('src/commons/getUtil');
const RequestOptions = require('./data-models/request-options');

const $LABEL = 'HTTPRequestService';

class HTTPRequestService {

    static makeRequest(endpoint, payload, headers, _callback) {
        const options = new RequestOptions(endpoint, payload, headers);

        return HTTPRequestService.handleRequest(options, _callback);
    }

    static handleRequest(options, _callback) {
        const $JOB_LABEL = 'handleRequest', $LOG_LABEL = `[${$LABEL}][${$JOB_LABEL}]`;
        Logger.debug(`${$LOG_LABEL} sending request..`, options);

        return (!getUtil.hasCallbackFn(_callback))
            ? request(options)
            : request(options, (error, response, body) => {
                Logger.debug(`${$LOG_LABEL} response..`, { error, response });
                return (!error)
                    ? _callback(null, response)
                    : _callback(new setError($LABEL, error, { options, body }, 'failed to execute action'), null);
            });
    }

}

module.exports = HTTPRequestService;
