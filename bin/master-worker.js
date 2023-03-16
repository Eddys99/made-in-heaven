require('app-module-path').addPath(`${__dirname}/..`);
require('config/configs/db_connection');

const express = require('express');
const body_parser = require('body-parser');
const cookie_parser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const config = require('config');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
    })
);

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookie_parser("secretcode"));

const Routes = require('src/master/routes/index');

app.use(new Routes(express));

app.listen(config.MasterWorker.PORT, () => console.log(`Application started on port ${config.MasterWorker.PORT}`));
