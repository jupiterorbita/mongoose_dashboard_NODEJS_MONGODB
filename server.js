var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
const flash = require('express-flash');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./client/static")));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
app.use(flash());

const server = app.listen(5000);
console.log("SERVER ===========> ", server)
console.log('listening on port: 5000');

//session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

require("./server/config/mongoose.js")
// require('./server/models/animal.js')

require('./server/config/routes.js')(app);