require('app-module-path').addPath(`${__dirname}/..`);

const express = require('express');
const body_parser = require('body-parser');
const config = require('config');
const Routes = require('src/discord-proxy/routes/index');
const Logger = require('src/commons/logger/logger-config.js');

const app = express();
app.use(body_parser.json());
app.use(new Routes(express));

app.listen(config.DiscordProxy.PORT, () => console.log(`Application started on port ${config.DiscordProxy.PORT}`));
