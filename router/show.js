import express from 'express'
const app=express()
const router= express.Router();
import File from '../models/file.js'

router.get('/:uuid',async(req,res)=>{
    try {
        const file =await File.findOne({uuid:req.params.uuid})
        
        if(!file){
            return res.render('download',{error:'file not found'})
        }
else{
       return res.render('download',{
        uuid:file.uuid,
        filename:file.filename,
        filesize:file.size,
        download:`${process.env.APP_BASE_URL}/files/download/${file.uuid}`
    })
    
    }


    } catch (error) {
        return res.render('download',{error:'some error occured'})
    }
})

export default router;