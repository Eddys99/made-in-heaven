'use strict';

const configs = [
    require('./master-worker'),
    require('./discord-config'),
    require('./discord-proxy')
];

module.exports = {
    load: (env) => {
        const result = {};

        configs.map(config => config(env))
            .forEach(config => Object.assign(result, config));

        return result;
    }
};
