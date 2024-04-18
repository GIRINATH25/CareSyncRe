import React, { useState } from "react";
import newlogo from "../../assets/logo-ihealth.png";
import finger from "../../assets/finger.gif";
import styles from "./patientCSSLogin.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PatientLogin() {

  const navi = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('/login/patient',{email,password});
      const data = response.data;
      if(data.message === 'login successfull'){
        const email = data.email;
        navi("/patient/Dashboard",{state:{email}});
      }else{
        toast.info(data.message);
      }

    }catch(err){
      console.log("Error: "+err);
    }
  }

  return (
    <div className={styles.main}>
      <div
        className={`${styles.container} ${styles["a-container"]}`}
        id="a-container"
      >
        <form className={styles.form} id="a-form" method="post" onSubmit={handleSubmit}>
          <img src={newlogo} alt="" width="100px" height="100px" />
          <h2 className={`${styles.form_title} ${styles.title}`}>Login</h2>
          <input
            className={styles.form__input}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.form__input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`${styles.form__button} ${styles.button} ${styles["switch-btn"]}`}
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
      <div className={styles.switch} id="switch-cnt">
        <div
          className={styles.finger}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src={finger}
            width="250"
            height="240"
            style={{
              borderRadius: "100px",
              marginLeft: "20px",
              marginTop: "70px",
            }}
            alt=""
          />
          <a href="finger_print.ejs">
            <button
              className={`${styles.form__button} ${styles.button} ${styles["switch-btn"]}`}
              style={{ marginLeft: "50px" }}
              type="submit"
              name="signup"
            >
              BIOMETRIC
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default PatientLogin;
