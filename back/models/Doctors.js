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
    },
    bp:{
        type:String,
        default:"--"
    },
    sugar:{
        type:String,
        default:"--"
    },
    heartrate:{
        type:String,
        default:"--"
        
    },
    glucose:{
        type:String,
        default:"--"
    },
    uploadedPDFs:[{
        type:String
    }]
})

const DoctorUser = mongoose.model('DoctorUser',userSchema);
module.exports = DoctorUser;