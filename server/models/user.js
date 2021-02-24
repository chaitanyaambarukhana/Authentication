//modules required for user Model

let mongoose = require('mongoose')
let passportLocalMongoose = require('passport-local-mongoose')

let user = mongoose.Schema({
    username:{
        type:String,
        default:"",
        trim:true,
        required: 'USername is required'
    },
    email:{
        type:String,
        default:"",
        trim:true,
        required: 'Email address is required'
    },
    displayName:{
        type:String,
        default:"",
        trim:true,
        required: 'displayName is required'
    },
    created:{
        type:Date,
        default:Date.now,
        
    },
    updated:{
        type:Date,
        default:Date.now,
        
    }
},
{
    collection : "users"
})

//configure options for our user model 

let options = ({missingPasswordError:'Wrong/missing Password'})

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("User", User)