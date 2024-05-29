const express = require("express");
const env = require("dotenv");
env.config();
const bodyParser = require("body-parser");
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const database = require("./config/database");
database.connect();

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// Flash
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const routesApiV1 = require("./v1/routes/index.route");

routesApiV1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})