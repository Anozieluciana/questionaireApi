const mongoose = require("mongoose")

const category = new mongoose.Schema({
    whichCategory:[
        {
            type:String,
            required:true,
            trim:true
        }
    ],
    questions:[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"questions"
        }
    ]
}, {timestamps:true})

module.exports = mongoose.model("categories", category)