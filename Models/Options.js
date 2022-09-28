const mongoose = require("mongoose")

const option = new mongoose.Schema({
    alternatives:[
        {
            text:{
                type:String,
                required:true
            },
            isCorrect:{
                type:Bolean,
                required:true,
                default:false
            }
        }
    ],

    questions:[
       { 
        type:mongoose.Schema.Types.ObjectId,
        ref:questions
    }
    ]
}, {timestamps:true})

module.exports= mongoose.model("options", option)