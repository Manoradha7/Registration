import express from 'express';
import { ObjectId } from 'mongodb';
import {client } from '../index.js';
import multer from 'multer';
const router = express.Router();


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
})

//middleware
const upload = multer({
    storage : storage,
    fileFilter:function(req,file,cb){
        if(
            file.mimetype == 'image/png' ||
            file.mimetype == 'image/jpg' 
        ){
            cb(null, true)
        }else{
            console.log('only jpg & png file supported')
            cb(null,false)
        }
    },
    
}).single("profimg")

router.route('/').post(upload,async(req,res)=>{
    try{
        console.log(req.body.profimg)
    const data = [{
        fullname : req.body.fullname,
        profimg : req.file.filename,
        mobile : req.body.mobile,
        email:req.body.email,
        jobtype:req.body.jobtype,
        dob:req.body.dob,
        loation:req.body.location
    }]
    const employee = await client.db('ppa').collection('employee').insertMany(data);
    res.status(200).send({Message:"Employee Detail added Successfully"});
    }catch(err){
        console.log(err)
      res.status(400).send(err);
    }
})
 router.route("/").get(async(req,res)=>{
     try{
        const empData = await client.db('ppa').collection('employee').find().toArray()
        res.status(200).send(empData)
     }catch(err){
         console.log(err)
         res.status(400).send(err)
     }
 })
 router.route('/:id').put(async(req,res)=>{
     try{
         const {id} = req.params;
         const data = req.body;
         const updatedEmp = await client.db('ppa').collection('employee').findOneAndUpdate({_id:ObjectId(id)},{$set:data});
         res.status(200).send({Message:"Employee detail updated successfully"})
     }catch(err){
         res.status(400).send(err)
     }
 })
 router.route('/:id').delete(async(req,res)=>{
     try{
        const {id} = req.params;
        const delEmp = await client.db('ppa').collection('employee').deleteOne({_id:ObjectId(id)});
        res.status(200).send({Message:'Employee deatail deleted Successfully'})
     }catch(err){
         res.status(400).send(err)
     }
 })
export const EmployeeRouter = router;