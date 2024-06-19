const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const doctor = require('../models/Doctors');
const upload = require('../middleware/storeFiles');
const patient = require('../models/Patient');

router.post('/doctor', upload.single('imageUrl'), async (req, res) => {
  const {
    username,
    email,
    password,
    DOB,
    specialist,
    phone,
    address,
    gender
  } = req.body;


  const Hasemail = await doctor.findOne({ email: email });

  if (Hasemail) {
    return res.json({ message: 'Email already registered' });
  }

  try {
    const hash = await bcrypt.hash(password, 10); 
    const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '1h' });
    
    const store = await doctor.create({
      username: username,
      email: email,
      password: hash,
      DOB: DOB,
      specialist: specialist,
      phoneNo: phone,
      Address: address,
      gender: gender,
      picture: req.file.filename,
      dtoken: token,
    });

    if (!store) {
      return res.json({ message: 'Registration failed' });
    }

    console.log(store);

    res.cookie('auth_tokenDoc', token, { httpOnly: true, maxAge: 3600000 });
    res.json({ message: 'Registration successfull' });
  } catch (error) {
    console.error('Error:', error);
    res.json({ message: 'Internal server error' });
  }
});

router.post('/patient', upload.single('imageUrl'), async(req,res)=>{
  try{
    const { fullname,username,email,DOB,age,phone,address,bloodgroup,password,Nominee,NomineePhone,NomineeRelation,gender } = req.body;

    const Hasemail = await patient.findOne({email:email});

    
    if(Hasemail){
      return res.json({ message: 'Email already registered' });
    }
    
    const hash = await bcrypt.hash(password, 10);
    
    const count  = await patient.find().count(); 
    
    const store = await patient.create({
      fullname: fullname,
      username: username,
      email: email,
      DOB: DOB,
      age:age,
      phone: phone,
      address: address,
      bloodgroup: bloodgroup,
      password: hash,
      Nominee: Nominee,
      NomineePhone: NomineePhone,
      NomineeRelation: NomineeRelation,
      gender: gender,
      imageUrl:req.file.filename,
      lastview:Date().toLocaleString(),
      Pid: count+1,
    });
    
    if(!store) {
      return res.json({ message: 'Registration failed' });
    }

    res.json({ message: 'Registration successfull',count:(count+1) });
  }catch(err){
    console.log("Error: "+err);
    res.json({ message: 'Internal server error' });
  }
})

module.exports = router;
