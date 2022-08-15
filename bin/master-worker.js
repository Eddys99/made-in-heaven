require('app-module-path').addPath(`${__dirname}/..`);
require('config/configs/db_connection');

const express = require('express');
const body_parser = require('body-parser');
const config = require('config');
const Routes = require('src/master/routes/index');

const app = express();
app.use(body_parser.json());
app.use(new Routes(express));

app.listen(config.made_in_heaven.PORT, () => console.log(`Application started on port ${config.made_in_heaven.PORT}`));
