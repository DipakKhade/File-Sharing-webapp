import express from 'express'
const router=express.Router();
import Files from '../models/file.js';

let a=process.cwd() +'\\this is a address'
let b=a.replace(/\\/g, '/')
console.log(b)

router.get('/:uuid',async(req,res)=>{
    const file=await Files.findOne({uuid:req.params.uuid})
    

    if(!file){
        return res.render('download',{
            error:'link expired ...'
        })
    }

   
        const fileaddress=`${process.cwd()}/${file.path}`
        const filepath=fileaddress.replace(/\\/g, '/')
        // const response = await file.save();
        console.log(filepath)
        res.download(filepath)
    
})


export default router;