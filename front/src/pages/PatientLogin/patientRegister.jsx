import React, { useState } from 'react'
import styles from './patient_register.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const patientRegister = () => {

  const navi = useNavigate();

  const [fullname,setFullname] = useState();
  const [username,setUsername] = useState();
  const [email,setEmail] =useState();
  const [DOB,setDOB] = useState();
  const [age,setAge] = useState();
  const [phone,setPhone] = useState();
  const [address,setAddress] = useState();
  const [bloodgroup,setBloodGroup] = useState();
  const [password,setPassword] = useState();
  const [Nominee,setNominee] = useState();
  const [NomineePhone,setNomineePhone] = useState();
  const [NomineeRelation,setNomineeRelation] = useState();
  const [gender,setGender] = useState();
  const [imageUrl, setImageUrl] = useState(null);

  const loadFile = (e)=>{
    setImageUrl(e.target.files[0]);
  }
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("fullname",fullname);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("DOB", DOB);
      formData.append("age", age);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("bloodgroup", bloodgroup);
      formData.append("password", password);
      formData.append("Nominee", Nominee);
      formData.append("NomineePhone", NomineePhone);
      formData.append("NomineeRelation", NomineeRelation);
      formData.append("gender", gender);
      formData.append("imageUrl", imageUrl);
      const response = await axios.post(`/register/patient`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      if(response.data.message==="Registration successfull"){
        navi("/DoctorDashboard",{state:{email}});
      }else{
        toast.info(response.data.message);
      }

      
    }catch(err){
      console.log("Error: "+err);
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.content}>
          <form action="#" onSubmit={handleSubmit}>
          <div className={styles.title}>Registration</div>
            <div className={styles['user-details']}>
              <div className={styles['input-box']}>
                <span className={styles.details}>Full Name</span>
                <input type="text" placeholder="Enter your name" value={fullname} onChange={(e)=>setFullname(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Username</span>
                <input type="text" name="username" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Email</span>
                <input type="text" name="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Date Of Birth</span>
                <input type="date" name="dob" placeholder="Enter your DOB" value={DOB} onChange={(e)=>setDOB(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Age</span>
                <input type="number" name="age" placeholder="Enter your Age" value={age} onChange={(e)=>setAge(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Phone Number</span>
                <input type="text" name="phone_number" placeholder="Enter your number" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Address</span>
                <input type="text" name="address" placeholder="Enter Your Address" value={address} onChange={(e)=>setAddress(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Blood Group</span>
                <input type="text" name="blood_group" placeholder="Enter Your Blood Group" value={bloodgroup} onChange={(e)=>setBloodGroup(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Password</span>
                <input type="password" name="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Nominee Name</span>
                <input type="text" name="nominee_name" placeholder="Enter the Nominee Name" value={Nominee} onChange={(e)=>setNominee(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Nominee Phone Number</span>
                <input type="number" placeholder="Enter the Nominee Mobile No." value={NomineePhone} onChange={(e)=>setNomineePhone(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Nominee Relation</span>
                <input type="text" name="nominee_relation" placeholder="Enter the Nominee Relation" value={NomineeRelation} onChange={(e)=>setNomineeRelation(e.target.value)} required />
              </div>
              <div className={styles['input-box']}>
                <span className={styles.details}>Upload Your Image</span>
                <input type="file" name="profile" accept="image/*" onChange={loadFile} />
              </div>
              <div className={styles["input-box"]}>
              <span className={styles.details}>Gender</span>
              <input
                type="text"
                placeholder="Enter your gender"
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
                required
              />
            </div>
            </div>
            
            <div className={styles.button}>
              <input type="submit" value="Register" />
            </div>
          </form>
        </div>
      </div>
  )
}

export default patientRegister