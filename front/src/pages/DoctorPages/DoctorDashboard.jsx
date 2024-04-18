import React, { useEffect, useState } from "react";
import styles from "./doctors_dashboard.module.css";
import tele from "../../assets/tele.jpg";
import finger from "../../assets/finger.jpg";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DoctorDashboard = () => {
  const { email } = useLocation().state || {};
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(email);
        const response = await axios.post("/dashboard", { email: email });
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.main}>
      <div className={`${styles.container}`}>
        {user && (
          <div
            className={styles.welcome}
            style={{
              backgroundColor: "rgb(13, 70, 241)",
              borderRadius: "30px",
              width: "40%",
              margin: "30px",
              marginLeft: "100px",
            }}
          >
            <h4
              style={{
                paddingLeft: "30px",
                marginLeft: "7px",
                color: "white",
                fontWeight: "bolder",
                fontSize: "27px",
              }}
            >
              Welcome Back {user.username}!
            </h4>
          </div>
        )}
        {user && (
          <img
            src={`http://localhost:8000/dashboard/${user.picture}`}
            style={{
              borderRadius: "100%",
              marginTop: "25px",
              marginLeft: "-80px",
            }}
            width="120"
            height="120"
            alt="hello"
          />
        )}
      </div>
      <div className={styles.i2nd}>
        <div className={styles.login}>
          <h4>VIEW PATIENT</h4>
          <a href="finger_print2.ejs">
            <img
              src={finger}
              style={{ borderRadius: "0 0 100px 0" }}
              width="200"
              height="190"
              alt=""
            />
          </a>
        </div>
        <div className={styles.telematics}>
          <h4>PATIENT REGISTER</h4>
          <a href="/patientRegister">
            <img
              src={tele}
              width="200"
              height="190"
              style={{ borderRadius: "0 0 100px 0" }}
              alt=""
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
