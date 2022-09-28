const question = require("../Models/Questions")
const category = require("../Models/Categories")
const { default: mongoose } = require("mongoose")


const createQuestion = async(req, res, next)=>{
    try{
        const aCategory = await category.findById(req.params.id)
        const askQuestion = await new question(req.body)

        askQuestion.categories=aCategory
        askQuestion.save()

        aCategory.questions.push(mongoose.Types.ObjectId(askQuestion._id))
        aCategory.save()

        res.status(202).json({
            status:"this is the question",
            data:askQuestion
        })
    }
    catch(error){
        next(error)
    }
}


const getAllQuestions = async(req, res, next)=>{
    try{
        const getCategory = await question.find()

        res.status(200).json({
            status:"all categories",
            data:getCategory
        })
    }
    catch(error){
        next(error)
    }
}


module.exports ={
    createQuestion,
    getAllQuestions
}