const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const doctor = require('../models/Doctors');
const patient = require('../models/Patient');


router.post('/doctor', async(req, res) => {

  const { email, password } = req.body;

  const Hasemail = await doctor.findOne({ email: email });

    if (!Hasemail) {
      return res.json({ message: "Email doesn't exist" });
    }
    const dbPassword = Hasemail.password;
    const match = await bcrypt.compare(password, dbPassword);

    if (!match) {
      return res.json({ message: "wrong password" });
    }
    
    const token = jwt.sign({ email }, 'your_secret_key',{ expiresIn: '1h' });

    res.cookie('auth_tokenDoc', token, { httpOnly: true , maxAge: 3600000 });

    res.json({ message: "login successfull" });
});

router.post('/patient', async (req, res)=>{
  try{
    const {email, password} = req.body;
     
    const Hasemail = await patient.findOne({ email: email });

    if(!Hasemail){
      return res.json({message:"Email doesn't exist"});
    }

    const dbPassword = Hasemail.password;
    const match = await bcrypt.compare(password, dbPassword);

    if(!match){
      return res.json({message:"Worng Password"});
    }

    const currentDateTime = new Date();

    await patient.updateOne(
      {email:email},
      {$set:{lastview:currentDateTime.toLocaleString()}}
    );

    res.json({message:"login successfull",email:email});

  }catch(err){
    console.log(`Error: `+err);
  }
})

module.exports = router;
