const express = require("express")
const router = express.Router()

const { postCategory, getAllCategory, GetOneCategory, deleteOneCategory } = require("../Controller/CategoryC")


router
    .route("/:id/category")
    .post(postCategory)
    .get(getAllCategory )

router
    .route("/:id")
    .get(GetOneCategory)
    .delete(deleteOneCategory)


    module.exports= router