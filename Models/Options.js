const mongoose = require("mongoose")

const option = new mongoose.Schema({
    details:[
        {
            text:{
                type:String,
                required:true
            },
            isCorrect:{
                type:Boolean,
                default:false
            }
        }
    ],
        score:{
            type:Number,
            default:0
        },
        status:{
            type:String
        },

    questions:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"questions"
    }
    
}, {timestamps:true})

module.exports= mongoose.model("options", option)