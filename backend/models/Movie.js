const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    image:{
        type:String,
        required:true
    },
    document:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports = mongoose.model('Movie',movieSchema);

