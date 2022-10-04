const Categories = require("../Models/Categories");
const { FieldRequiredError, ForbiddenError } = require("../ErrorHandler/Customized");
const user = require("../Models/userModel")


const postCategory = async(req, res, next)=>{
    try{
        const admin = req.params.id;
        const findUser = await user.findById({_id:admin,isAdmin:true})
        if(!findUser.isAdmin){
            throw new ForbiddenError(`questions`)
        }
      const {whichCategory} = req.body;
      if(!whichCategory) throw new FieldRequiredError(`a category`)

      const category= await Categories.create({
        whichCategory:whichCategory
      })
        res.status(201).json({
            status:"category has been created successfully",
            data:category
        })
    }
    catch(error){
        next(error)
    }
}

const GetOneCategory = async(req, res, next)=>{
    try{
        const oneCategory = await Categories.findById(req.params.id).populate("questions")
        res.status(200).json({
            status:"just this category",
            data:oneCategory
        })
    }
    catch(error){
        next(error)
    }
}
const deleteOneCategory = async(req, res, next)=>{
    try{
        const oneCategory = await Categories.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:"just this category",
            data:deleteOneCategory
        })
    }
    catch(error){
        next(error)
    }
}


const getAllCategory = async(req, res, next)=>{
    try{
        const getCategory = await Categories.find()

        res.status(200).json({
            status:"all categories",
            data:getCategory
        })
    }
    catch(error){
        next(error)
    }
}

module.exports={
    postCategory,
    getAllCategory,
    GetOneCategory,
    deleteOneCategory
}