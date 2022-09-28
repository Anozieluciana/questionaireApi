const express = require("express")
const router = express.Router()
const { createQuestion, getAllQuestions } = require("../Controller/questionC")


router
    .route("/:id/?")
    .post(createQuestion)
    .get( getAllQuestions)

module.exports=router