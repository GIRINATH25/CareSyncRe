const express = require("express");
const router = express.Router();
const { spawn } = require('child_process');
const patient = require('../models/Patient');
const path = require('path');

router.post('/login',async(req,res)=>{

    const executablePath = path.join(__dirname, '..', 'fingerprint', 'bin', 'Debug', 'fingerprint.exe');
    const cs = spawn(executablePath, ["login"]);

  var temp = "";

  cs.stdout.on('data', async (data) => {
    const result = data.toString().trim();
    console.log(`Result from C# program: ${result}`);
    console.log(typeof(result));
    temp = result;

    try {
      
      console.log('Temp value:', temp);

      const user = await patient.findOne({ email: temp });

      if (!user) {
        return res.json({message:"No match was found!!!!"});
      }

      res.json({message:"login successfull",email:temp});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred.');
    }
  });

  cs.stderr.on('data', (data) => {
    console.error(`Error from C# program: ${data}`);
  });
})

router.post('/register',async(req,res)=>{
    try{
        const {count} =req.body;
        console.log(count);
        const executablePath = path.join(__dirname, '..', 'fingerprint', 'bin', 'Debug', 'fingerprint.exe');
        const cs = spawn(executablePath, ["register", count]);
        var temp = "";

  cs.stdout.on('data', async (data) => {
    const result = data.toString().trim();
    console.log(`Result from C# program: ${result}`);
    console.log(typeof(result));
    temp = result;

    try {
      
      console.log('Temp value:', temp);

      const user = await patient.findOne({ email: temp });

      if (!user) {
        return res.json({message:"No match was found!!!!"});
      }

      res.json({message:"registered successfull",email:temp});
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('An error occurred.');
    }
  });

  cs.stderr.on('data', (data) => {
    console.error(`Error from C# program: ${data}`);
  });

    }catch(err){
        console.log("Register"+err);
    }
})

module.exports = router;