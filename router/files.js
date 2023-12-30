import express from 'express'
import multer from 'multer';
import path from 'path'
import File from '../models/file.js' 
import {v4} from 'uuid'

// import sendMail from '../mail/email.js';
// import emailTemp from '../mail/emailTemp.js'

import { config } from 'dotenv';
config();


const router = express.Router();

router.post('/',(req,res)=>{

     //storing a file to local first using multer
     const storage=multer.diskStorage({
        destination:(req,file,callback)=>callback(null,'uploads/')
        ,

        filename:(req,file,callback)=>{
            const fileName=`${Date.now()}-${Math.round(Math.random()*100000)}${path.extname(file.originalname)}`
            callback(null,fileName)
        }
    })

    const upload=multer({
        storage,
        limits:{fileSize:104857600}
    }).single('sendfile');


    
   
   //storing file 
   upload(req,res,async(err)=>{

    if(! req.file){                                                //checking the req is valid or not
        return res.json({error:'add file '})
    }

    if(err){
        res.status(500).send({error: err.massage})
    }

    
    //else we store file in database
    const file =new File({
        filename:req.file.filename,   
uuid:v4(),
path:req.file.path,
size:req.file.size

})
// console.log(path)
    
    const responce = await file.save();
    res.redirect(`${process.env.APP_BASE_URL}/files/${file.uuid}`);

    
    // return res.json(
    //     {
    //         // file:`${process.env.APP_BASE_URL}/files/${file.uuid}`,
    //     downloadlink:`${process.env.APP_BASE_URL}/files/${file.uuid}`
    // }
    
    // )



    

})
})


//email fields
router.post('/send',async(req,res)=>{
    const {uuid , sender , recevier} = req.body

    if(!uuid || !sender || !recevier){
        res.send({error:'fill all fields'})
    }

    const file=File.findOne({uuid:uuid})

    if(sender){
        res.send({error:'emali is already sent'})
    }

    file.sender=body.sender
    file.recevier=body.recevier

    const responce = await file.save()



    //sending email to recevier
// sendMail({
//     from : sender,
//     to: recevier,
//     subject:'This is a subject ',
//     text:`File from ${sender}`,
//     html:emailTemp({
//         emailsender : sender,
//         downloadLink:`${APP_BASE_URL}/files/${file.uuid}`,
//         size:`${parseInt(file.size/1000)}kb`,
//         expires:'48 hours'
//     })
// })

})

export default  router ;

