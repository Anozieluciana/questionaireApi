const express = require("express")
const router = express.Router()
const { postOptions, getAllOption} = require("../Controller/OptionC")

router.post("/:questionid/optionss", postOptions)
router.get("/:questionid/optionss",getAllOption)



module.exports = router