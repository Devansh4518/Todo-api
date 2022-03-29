const express = require('express')
const dotenv = require('dotenv')
const todoRoutes = require('./routes/todo')
const mongoose = require('mongoose')

const app = express()
dotenv.config//this one is used to run the contents of dotenv in this file

const Database_URL = process.env.Database_URL
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({'message':'server is running'})
})
app.use('/todo',todoRoutes)

mongoose.connect('mongodb+srv://admin:6Mu1Vsi54u1DkUb0@learn.jtgx5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser : true})
.then(()=>{
    console.log("DatabASE connection sucessful");
    app.listen(5000,()=>{
        console.log("The server is listening on port 5000");
    })
    }).catch((err)=>{
        console.log('Database connection failed');
        console.log(err);
})
