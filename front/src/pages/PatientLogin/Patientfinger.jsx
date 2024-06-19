import React from "react";
import axios from "axios";
import { useLocation,useNavigate } from "react-router-dom";
import styles from "./patient_register.module.css";

const Patientfinger = () => {
  const { count } = useLocation().state || {};
  console.log(count);
  const navi = useNavigate();

  const handleSubmit = async()=>{
    e.preventDefault();
    try{
      const response = await axios.post('/fingerprint/register',{ count : count });
      let email = response.data.email;
      if(response.data.message==="registeration successfull"){
        navi("/patient/Dashboard/edit",{state:{email}});
      }

    }catch(err){
      console.log("Saving fingerprint"+err);
    }
  }

  return (
    <form>
      <div className={styles.button}>
        <input type="submit" value="Click to scan fingerprint" onClick={handleSubmit}/>
      </div>
    </form>
  );
};

export default Patientfinger;
