const express = require('express')
const exphbs  = require('express-handlebars');

const app = express()
const port = 3000

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
