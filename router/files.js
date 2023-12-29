import express from 'express'
import multer from 'multer';
import path from 'path'
import File from '../models/file.js' 
import {v4} from 'uuid'

import { config } from 'dotenv';
config();


const router = express.Router();

router.post('/',(req,res)=>{

     //storing a file to local first using multer
     const storage=multer.diskStorage({
        destination:(req,file,callback)=>callback(null,'uploads/')
        ,

        filename:(req,file,callback)=>{
            const fileName=`${Date.now()}-${Math.round((Math.random)*100000)}-${path.extname(file.originalname)}`
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
        fileSize:req.file.filename,
uuid:v4(),
path:req.file.path,
size:req.file.size

    })
    
    const responce = await file.save();
    return res.json({file:`${process.env.APP_BASE_URL}/files/${responce.uuid}`})
    // console.log(responce)
})
})

export default  router ;