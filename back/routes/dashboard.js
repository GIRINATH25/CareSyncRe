const express = require('express');
const router = express.Router();
const doctor = require('../models/Doctors');
const patient = require('../models/Patient');
const path = require('path');


router.post('/dashboardDoctor', async(req,res)=>{
    try{
        const {email} = req.body;
        const user = await doctor.findOne({email:email});
        
        if(!user){
            return res.json({message:"No data found"});
        }

        res.json(user);
    }catch(err){
        console.log('Error: '+err);
    }
})

router.get('/dashboard/:pic',async(req,res)=>{
    try{
        picUrl=req.params.pic;
        picture=path.join(__dirname,"../uploads/",picUrl);
        res.sendFile(picture);
    }catch(err){
        console.log("Error: "+err);
    }
})

router.get('/dashboardPatient',async(req,res)=>{
    try{
        const {email} = req.query;

        const user = await patient.findOne({email:email});

        if(!user){
            return res.json({message:"No data found"});
        }

        res.json(user);
    }catch(err){
        console.log("Error: "+err);
    }
})

module.exports = router;