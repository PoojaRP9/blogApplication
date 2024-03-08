const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require("./db/database");

const mainRouter = require("./routes/main");

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');

app.use('/', mainRouter);

app.listen(8000, () => {
    console.log("Server started");
});

module.exports = app;