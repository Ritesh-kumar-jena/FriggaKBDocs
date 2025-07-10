const dotenv=require("dotenv").config()
const express=require("express")
const cors=require('cors')
const { connection } = require("./db")
const { userRoute } = require("./Controller/userRoutes")
const { documentRoute } = require("./Controller/documentRoutes")

const port=process.env.port

const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send("Wlcome to FriggaKBDocs")
})

app.use("/users",userRoute)
app.use("/documents",documentRoute)

app.listen(port,async()=>{
    try {
        await connection
        console.log(`server is running on port:- ${port} and connected to FriggaKBDocs Database`)
    } catch (error) {
        console.log(error)
    }
})