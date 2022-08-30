'use strict';

class CustomHeaders {

    constructor(headers = {}) {
        Object.keys(headers).forEach((key,index) => {
            this[key] = headers[key];
        });

        if (headers && headers['content-type']) {
            this['Content-Type'] = headers['content-type'];
        } else {
            this['Content-Type'] = 'application/json';
        }

        if (headers && headers['x-requested-by']) {
            this['X-Requested-By'] = headers['x-requested-by'];
        } else {
            this['X-Requested-By'] = 'NODE+JSON1.0';
        }


        if (headers && headers['x-origin']) {
            this['x-Origin'] = headers['x-origin'];
        } else {
            this['x-Origin'] = 'http://localhost';
        }

    }
}


class RequestOptions {

    constructor(url, payload, headers) {
        this.method = 'POST';
        this.uri = url;
        this.json = (payload) ? payload : {};

        if (headers) {
            this.headers = new CustomHeaders(headers);
        }
    }
}

module.exports = RequestOptions;
