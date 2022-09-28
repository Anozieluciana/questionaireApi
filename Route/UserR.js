const express = require("express")
const router = express.Router()

const { signUpAdmin, signInAdmin, signUpUser, ResetPassWord, getAllUser } = require("../Controller/user")

router
    .route("/admin")
    .post(signUpAdmin)

router
    .route("/admin/signin")
    .post(signInAdmin)

router
    .route("/user")
    .post(signUpUser)
router
    .route("/resetPassword:_id")
    .post(ResetPassWord)
router
    .route("/")
    .get(getAllUser)


    module.exports= router