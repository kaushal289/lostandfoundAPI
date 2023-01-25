require('dotenv').config()
const express = require('express')
const app = express()
const path =  require('path')
const user_routes = require('./routes/user-routes')
const mongoose =  require("mongoose")
const auth =require('./middleware/auth')

const port = process.env.PORT || 3000

mongoose.set('strictQuery', false);


mongoose.connect('mongodb://127.0.0.1:27017/lostfound').then(() => {
    console.log('Connected to MongoDB')
    app.listen(port,()=>{
        console.log(`App is running on port : ${port}`)
    })    
}).catch((err) => console.log(err))


app.use((req,res,next)=>{
    next()
})

app.use(express.json())

app.get('^/$|/index(.html)?',(req,res)=>{
    // res.send("hello World")
    res.sendFile(path.join(__dirname,'views','index.html'))
})

app.use('/users',user_routes)

app.use((err,req,res,next)=>{
    console.log(err.stack)
    if (res.statusCode == 200) res.status(500)
    res.json({"msg":err.message})
    })


