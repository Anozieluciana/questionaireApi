const questionC = require("../Models/Questions")
const category = require("../Models/Categories")
const { default: mongoose } = require("mongoose")


const createQuestion = async(req, res, next)=>{
    try{
        const aCategory = await category.findById(req.params.id)
        const askQuestion = await questionC({descriptionQuestion: req.body.descriptionQuestion})

        askQuestion.categories=aCategory
        askQuestion.save()

        aCategory.questions.push(askQuestion)
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
        const getCategory = await questionC.find().populate("options")

        res.status(200).json({
            status:"all questions s",
            data:getCategory
        })
    }
    catch(error){
        next(error)
    }
}


const deleteOneQuestions = async(req, res, next)=>{
    try{
        const catId = req.params.catId;
        const theCategory = await category.findById(catId);
        theCategory.questions.pull(req.params.id);
        theCategory.save();
        const removeQuestion = await questionC.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status:"a question has been deleted",
            data:removeQuestion
        })
    }
    catch(error){
        next(error)
    }
}


module.exports ={
    createQuestion,
    getAllQuestions,
    deleteOneQuestions
}