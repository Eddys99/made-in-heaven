'use strict';

class setError {

    constructor(where, error, data, msg) {
        this.where = where;
        this.data = data;
        this.error = {
            raw: error,
            toString: (error && error.toString)
                ? error.toString()
                : error
        };
        this.msg = msg;
    }
}

module.exports = setError;
