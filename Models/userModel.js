const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    full_name:{
        type:String,
        required:true,
        trim: true
    },
    user_name:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        trim: true,
        tolowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error ("this email is not valid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim: true
    },
    verify:{
        type:Boolean
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
    
  
}, {timeStamps: true})

module.exports = mongoose.model("users", userSchema)