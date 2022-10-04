const mongoose = require("mongoose")

const question = mongoose.Schema({
    descriptionQuestion:{
        type:String,
        // required:true,
        trim:true
    },

    categories:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"categories"
        },
    options:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"options"
        }
    ]
 
}, {timestamps:true})

module.exports= mongoose.model("questions", question)