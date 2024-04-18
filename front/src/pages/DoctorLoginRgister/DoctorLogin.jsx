import React,{useState} from 'react';
import styles from "./patient-login.module.css"; 
import newlogo from "../../assets/logo-ihealth.png";
import finger from "../../assets/finger.gif";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DoctorLogin() {

  const navi = useNavigate();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async(e)=>{
    try{
      e.preventDefault();
      const response = await axios.post(`/login/doctor`,{email,password});
      if(response.data.message==='login successfull'){
        navi("/DoctorDashboard",{state:{email}});
      }else{
        toast.info(response.data.message);
      }
    }catch(err){
      console.lof("Error: "+err);
    }
  }

  return (
    <div className={styles.main}>
      <div className={`${styles.container} ${styles['a-container']}`} id="a-container">
        <form className={styles.form} id="a-form" onSubmit={handleSubmit}>
          <img src={newlogo} alt="" width="100px" height="100px" />
          <h2 className={`${styles.form_title} ${styles.title}`}>Login</h2>
          <input className={styles.form__input} type="text" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className={styles.form__input} type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className={`${styles.form__button} ${styles.button} ${styles['switch-btn']}`} type='submit' name="signup">LOGIN</button>
          <a href="/DoctorRegister"><p style={{ marginTop: '10px', fontWeight: 'bold', color: 'red' }}>Register for doctor</p></a>
        </form>
      </div>
      <div className={styles.switch} id="switch-cnt">
        <div className={styles.finger} style={{ display: 'flex', flexDirection: 'column' }}>
          <img src={finger} width="250" height="240" style={{ borderRadius: '100px', marginLeft: '20px', marginTop: '70px' }} alt="" />
          <a href="finger_print3.ejs">
            <button className={`${styles.form__button} ${styles.button} ${styles['switch-btn']}`} style={{ marginLeft: '50px' }} type='submit' name="signup">BIOMETRIC</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
