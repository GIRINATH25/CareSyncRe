const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookie = require("cookie-parser");
const auth = require('./middleware/auth');
const login = require('./routes/login');
const Register = require('./routes/register');
const Dashboard = require('./routes/dashboard');

const app = express();
app.use(express.json());
app.use(cookie());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

const excludedPaths = ['/register/doctor','/login/doctor','/login/patient','/dashboardPatient'];

app.use((req, res, next) => {
  if (excludedPaths.includes(req.path) || req.path.startsWith('/dashboard/')) {
    return next();
  }
  auth(req, res, next);
});


app.use('/login',login);
app.use('/register',Register);
app.use('/',Dashboard);

mongoose.connect("mongodb://localhost:27017")
        .then(()=>{
            console.log("connected to MongoDB");
        })
        .catch((e)=>{
            console.log("Error connecting to MongoDB");
        })

app.listen(8000,()=>{
        console.log("listening on 8000");
})