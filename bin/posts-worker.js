require('app-module-path').addPath(`${__dirname}/..`);
require('config/configs/db_connection');

const express = require('express');
const body_parser = require('body-parser');
const config = require('config');
const Routes = require('src/workers/posts-worker/routes/index');
const Logger = require('src/commons/logger/logger-config');

const app = express();
app.use(body_parser.json());
app.use(new Routes(express));

app.listen(config.PostsWorker.PORT, () => Logger.info(`Application started on port ${config.PostsWorker.PORT}`));
