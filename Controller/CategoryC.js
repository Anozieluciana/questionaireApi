const Categories = require("../Models/Categories");
const { FieldRequiredError } = require("../ErrorHandler/Customized");


const postCategory = async(req, res, next)=>{
    try{
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
        const oneCategory = await Categories.findById(req.params.id)
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