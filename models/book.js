let mongoose =  require("mongoose")
mongoose.set('debug', true);


//create a model class
let bookModel = new mongoose.Schema({
    name : String, 
    author : String,
    published : String,
    description : String, 
    price : Number
},{collection:'books'})


module.exports = mongoose.model('Book', bookModel);