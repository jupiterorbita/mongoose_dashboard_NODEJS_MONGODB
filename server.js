var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(5000);
console.log('listening on port: 5000');

//session
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
// flash messages
const flash = require('express-flash');
app.use(flash());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_dashboard');

var AnimalSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3, maxlength: 20}
},
{timestamps: true});
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');

mongoose.Promise = global.Promise;

// ============= INDEX =====================
app.get('/', function(req, res) {   
    console.log("============ index ============");
    
    // console.log("\n\nrequest => ", req);
    // console.log("\n\nresponse =>", res);
    Animal.find({}, function(err, animals){
        // console.log(animals);
        // console.log('errors =>', err);
        if(err){
            return res.json(err)
        }
        return res.render('index', {animals: animals});
    });
});

// =========== GET /mongooses/new ejs ===============
app.get('/mongooses/new', function(req, res){
    console.log("============== render NEW ============");
    
    res.render('new');
})

// ============ GET /mongooses/id about/info ejs ===========
app.get('/mongooses/:id', function(req, res){
    console.log('>>> SERVER > /mongoose/info');
    console.log("id =>", req.params.id);
    Animal.findOne({_id: req.params.id}, function(err, animal){
        console.log("============== find =>",animal); // the object returned that found
        if (err){
            console.log("error retrieving animal =>", err);
        }
        else{
            
            res.render('info', {animal:animal});
        }
    })
})



// ========== POST /mongooses ======================
app.post('/mongooses', function(req, res){
    // console.log("POST DATA", req.body);
    // console.log(req.body.name);

    var animalInstance = new Animal({
        name: req.body.name
    });

    animalInstance.save(function(err) {
        if(err) {
            console.log('we have an error', err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/mongooses/new');
        } 
        else { 
            console.log('successfully added a user!');
            res.redirect('/');
        }
    })
})

// =========== GET  EDIT  /mongooses/edit/id ejs =============
app.get('/mongooses/edit/:id', function(req, res){
    console.log("==== EDIT ====");
    console.log(req.params.id);

    res.render('edit', {id:req.params.id});
})


// =========== POST  EDIT  /mongooses/edit/id METHOD ============
app.post('/mongoose/edit/:id', function(req, res){
    Animal.findOne({_id: req.params.id}, function(err, animals){
        animals.name = req.body.name;
        animals.save(function(err){
        // console.log(err);
        res.redirect('/')
            // if save was successful awesome!
        })
       })
})


// =========== GET /mongooses/destroy/id METHOD ==========
app.get('/mongooses/destroy/:id', function(req, res){
    console.log(req.params.id);

    Animal.remove({_id: req.params.id}, function(err){
        // console.log("ERROR======>",err)
    })
    console.log('DELETEING USER');
    res.redirect('/');
})