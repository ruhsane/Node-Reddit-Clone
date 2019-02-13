require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express()
const port = 3000

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === undefined || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(cookieParser());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(checkAuth);

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);
// Set db
require('./data/reddit-db');


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
