require('app-module-path').addPath(`${__dirname}/..`);
require('config/configs/db_connection');

const express = require('express');
const body_parser = require('body-parser');
const config = require('config');
const Routes = require('src/workers/master/routes/index');
const Logger = require('src/commons/logger/logger-config');

const app = express();
app.use(body_parser.json());
app.use(new Routes(express));

app.listen(config.MasterWorker.PORT, () => Logger.info(`Application started on port ${config.MasterWorker.PORT}`));
