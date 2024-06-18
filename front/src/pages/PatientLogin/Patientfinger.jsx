import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styles from "./patient_register.module.css";

const Patientfinger = () => {
  const { count } = useLocation().state || {};
  console.log(count);

  return (
    <form>
      <div className={styles.button}>
        <input type="submit" value="Click to scan fingerprint" />
      </div>
    </form>
  );
};

export default Patientfinger;
