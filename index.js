require("./Utils/db")
const express = require("express")
// const cors = require("cors")
const port = process.env.PORT
const userRoute = require("./Route/UserR")
const categoryRoute = require("./Route/CategoryR")
const questionR = require("./Route/QuestionR")

const app = express();

app.use(express.json())
app.get("/", (req,res)=>{
    res.send("let go to postman")
})
app.use("/api/user", userRoute)
app.use("/api/cart", categoryRoute)
app.use("/api/ask", questionR)

app.listen(port, ()=>{
    console.log("listening to server, port: " + port)
})