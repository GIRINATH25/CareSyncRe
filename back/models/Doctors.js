const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    specialist:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dtoken:{
        type:String,
        required:true
    }
})

const DoctorUser = mongoose.model('DoctorUser',userSchema);
module.exports = DoctorUser;