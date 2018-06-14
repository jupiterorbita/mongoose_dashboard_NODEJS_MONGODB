var path = require('path');

var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname, "./client/static")));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const flash = require('express-flash');
app.use(flash());

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

const server = app.listen(5000);
console.log("SERVER ===========> ", server)
console.log('listening on port: 5000');


// mongoose.model('User', new mongoose.Schema({
//     first_name: { 
//         type: String,
//         required: [true, 'Please include your first name.'] 
//     },
//     last_name: { 
//         type: String, 
//         required: [true, 'Please include your last name.'] 
//     }
// }));

// // ==========

// let UserSchema = new mongoose.Schema({
//     first_name: { 
//         type: String,
//         required: [true, 'Please include your first name.'] 
//     },
//     last_name: { 
//         type: String, 
//         required: [true, 'Please include your last name.'] 
//     }
// })
// mongoose.model('User', UserSchema);


// let User = mongoose.model('User')

// User.find()
// userinstance = new User();


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