const express = require('express')
const exphbs  = require('express-handlebars');

const app = express()
const port = 3000

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home', {msg: 'Reddit.js'});
});

app.get('/posts/new', function (req, res) {
    res.render('posts-new', {});
});

require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
