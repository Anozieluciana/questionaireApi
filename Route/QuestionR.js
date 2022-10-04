const express = require("express")
const router = express.Router()
const { createQuestion, getAllQuestions, deleteOneQuestions } = require("../Controller/questionC")


router
    .route("/:id/?")
    .post(createQuestion)
    .get( getAllQuestions)

router
    .route("/:id/?/questionid")

router.delete("/delete/:id/:catId", deleteOneQuestions)
module.exports=router