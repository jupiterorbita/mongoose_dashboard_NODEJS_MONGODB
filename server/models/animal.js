const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3, maxlength: 20}
},
{timestamps: true});
mongoose.model('Animal', AnimalSchema);