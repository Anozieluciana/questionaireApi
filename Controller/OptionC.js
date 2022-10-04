const questionM = require("../Models/Questions")
const optionM = require("../Models/Options")


const postOptions = async(req, res, next)=>{
    try{
        const getQuestion = await questionM.findById(req.params.questionid);
        const anOption = await optionM({
            details:req.body.details,
            score:req.body.score,
            status:req.body.status
        })

        anOption.questions = getQuestion
        anOption.save()

        getQuestion.options.push(anOption)
        getQuestion.save()

        res.status(200).json({
            status:"ok",
            data:anOption
        })
    }
    catch(e){
        next(e)
    }
}


const getAllOption = async(req, res, next)=>{
    try{
        const option = await optionM.find()
        res.status(200).json({
            status:"all options",
            data:option
        })
    }
    catch(error){
        next(error)
    }
}


module.exports={
    postOptions,
    getAllOption
}