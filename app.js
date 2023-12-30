import express from 'express'
import { config } from 'dotenv';
config();
import connectToMongoDB from './mongoDB.js';
import fileRouter from './router/files.js';
import show from './router/show.js'
import download from './router/download.js'
const app=express();
connectToMongoDB()
// app.use(express.static('public'));
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.render('home',)
})

//routes
app.use('/api/files',fileRouter)
app.use('/files',show)
app.use('/files/download',download)

app.listen(process.env.LOCAL_PORT,()=>{
    console.log('app started at port ' + process.env.LOCAL_PORT)
})