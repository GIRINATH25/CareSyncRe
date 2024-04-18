import React, { useState } from "react";
import styles from "./doctors_register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom';

const DoctorRegistration = () => {
  const navi = useNavigate();
  const [username, setUsername] = useState("");
  const [DOB, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirm, setConfirm] = useState("");
  const [gender, setGender] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  const loadFile = (event) => {
    const file = event.target.files[0];
    setImageUrl(file);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (confirm === password) {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("DOB", DOB);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("specialist", specialist);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("confirm", confirm);
        formData.append("gender", gender);
        formData.append("imageUrl", imageUrl);
        const response = await axios.post("/register/doctor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(response.data.message==="Registration successfull"){
          navi("/DoctorDashboard",{state:{email}});
        }else{
          toast.info(response.data.message);
        }
      } else {
        toast.info("Password and confirm password are not same");
      }
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Registration</div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles["user-details"]}>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Username</span>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Date of Birth</span>
              <input
                type="Date"
                placeholder="DD/MM/YYYY"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Specialist</span>
              <input
                type="text"
                placeholder="Enter your specialist"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Phone Number</span>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Address</span>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Gender</span>
              <input
                type="text"
                placeholder="Enter your gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
            <div className={styles["input-box"]}>
              <span className={styles.details}>Upload Your Image</span>
              <input type="file" accept="image/*" onChange={loadFile} />
            </div>
          </div>

          <div className={styles.button}>
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;
