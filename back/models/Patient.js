const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    DOB:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Nominee:{
        type:String,
        required:true
    },
    NomineePhone:{
        type:String,
        required:true
    },
    NomineeRelation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    lastview:{
        type:String,
    }
})

const PatientUser = mongoose.model('PatientUser',userSchema);
module.exports = PatientUser;