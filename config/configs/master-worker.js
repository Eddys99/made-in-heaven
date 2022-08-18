'use strict';

const DEFAULT_WINDOWS_ENV = { HOST: '127.0.0.1', PORT: 3035 };
const DEFAULT_UNIX_ENV    = { HOST: '0.0.0.0',   PORT: 3035 };

const DEFAULT_ENV =  (/^win/.test(process.platform)) ? DEFAULT_WINDOWS_ENV : DEFAULT_UNIX_ENV;

module.exports = (env) => {
    const worker = env.MasterWorker;

    return {
        MasterWorker: {
            name: (worker && worker.name) ? worker.name : 'MasterWorker',
            HOST: (worker && worker.HOST) ? worker.HOST : DEFAULT_ENV.HOST,
            PORT: (worker && worker.PORT) ? worker.PORT : DEFAULT_ENV.PORT,
        }
    };
};
