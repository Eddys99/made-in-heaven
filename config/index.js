'use strict';

const fs = require('fs');
const path = require('path');

const configs = require('./configs');

let json, env;

try {
    json = fs.readFileSync('./config/env.json').toString();
    env = JSON.parse(json);
} catch (error) {
    console.error('There are some issues with the configuration file from config/env.json', error);
    process.exit(0);
}

const config = configs.load(env);
config.assetsPath = path.join(__dirname, '..', 'assets');

module.exports = config;
