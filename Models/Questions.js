const mongoose = require("mongoose")

const question = new mongoose.Schema({
    descriptionQuestion:{
        type:String,
        required:true
    },

    categories:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"categories"
        }
    
    
}, {timestamps:true})

module.exports= mongoose.model("questions", question)