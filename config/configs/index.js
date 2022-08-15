'use strict';

const configs = [
    require('./made-in-heaven')
];


module.exports = {
    load: (env) => {
        const result = {};

        configs.map(config => config(env))
            .forEach(config => Object.assign(result, config));

        return result;
    }
};
