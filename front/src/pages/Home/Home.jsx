import React, { useState, useEffect } from 'react';
import styles from "./indexnew.module.css"; 
import logo from "../../assets/logo-ihealth.png";
import dash1 from "../../assets/dashboard1.jpeg";
import dash2 from "../../assets/dashboard2.jpeg";
import dash3 from "../../assets/dashboard3.jpeg";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [dash1, dash2, dash3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className={styles.logo}>
        <div>
          <img
            className={styles.logoo}
            src={logo}
            alt=""
            width="100"
            height="100"
          />
        </div>
        <div className={styles.title}>MED Vault</div>
      </div>
      <div className={styles.nav}>
        <a href='/'><div>HOME</div></a>
        <a href="/Doctorlogin"><div>Doctor's login</div></a>
        <a href="/Patientlogin"><div><p>Patient Login</p></div></a>
      </div>
      <div className={styles.adv}>
        <img id="carousel-image" src={images[currentIndex]} alt="" width="900" height="500" />
      </div>
      <div className={styles["about-us"]}>
        <div className={styles.ab1}>
          <h1>WHAT MED Vault OFFERS TO THE CITIZEN?</h1>
          <p>MED Vault offers so many features like</p>
        </div>
        <div className={styles.ab2}>
          <div className={styles.a1}>
            <h3>ONE CITIZEN ONE HEALTH RECORD</h3>
            <p>
              Unique Health Record for Citizens by virtue of Aadhaar Based Unique
              Health Identity Card. He/She can use the card for lifelong at
              Hospitals for getting treatment.
            </p>
          </div>
          <div className={styles.a1}>
            <h3>ONLINE APPOINTMENT BOOKING AT HOSPITALS</h3>
            <p>Citizen can book online appointments to any of the Hospitals with ease through Care Sync</p>
          </div>
          <div className={styles.a1}>
            <h3>TELEMEDICINE CONSULTATION</h3>
            <p>
              eHealth offers the citizens to consult the expert doctors virtually
              through Telemedicine facility provided through M-eHealth mobile app.
              For the time being review consultations are started as pilot and
              will be extended to the general public for booking advance
              appointments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
