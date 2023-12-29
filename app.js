import express from 'express'
import { config } from 'dotenv';
config();
import connectToMongoDB from './mongoDB.js';
import fileRouter from './router/files.js';
const app=express();

connectToMongoDB()

app.get('/',(req,res)=>{
    res.send('express')
})

//routes
app.use('/api/files',fileRouter)

app.listen(process.env.LOCAL_PORT,()=>{
    console.log('app started at port ' + process.env.LOCAL_PORT)
})