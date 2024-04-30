import React, { useEffect, useState } from "react";
import styles from "./pdash.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PatientDashboard = () => {
  const { email } = useLocation().state || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboardPatient", {
          params: { email },
        });
        setUser(response.data);
        console.log(response.data.uploadedPDFs);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {user && (
        <section className={styles.main}>
          <div className={styles["main-top"]}> 
            <h1>Welcome's You !!</h1>
          </div>
          <div className={styles.users}>
            <div className={styles.card}>
              <img
                src={`http://localhost:8000/dashboard/${user.imageUrl}`}
                alt="Profile"
              />
              <h4>{user.username}</h4>
            </div>
            <div className={styles.card}>
              <h4>Age: {user.age}</h4>
              <h4>Blood Group: {user.bloodgroup}</h4>
              <h4>Phone Number: {user.phone}</h4>
              <h4>Nominee Name: {user.Nominee}</h4>
              <h4>Nominee Relation: {user.NomineeRelation}</h4>
              <h4>Nominee Phone: {user.NomineePhone} </h4>
            </div>
            <div className={styles.card}>
            <h4>BP: {user.bp}</h4>
            <h4>Sugar Level: {user.sugar}</h4>
            <h4>Heart Rate: {user.heartrate}</h4>
            <h4>Glucose: {user.glucose}</h4>
          </div>
            <div className={styles.card}>
              <h1>Last Login</h1>
              <div style={{ marginRight: "auto" }}>
                Last view: {user.lastview}
              </div>
            </div>
          </div>

          <section className={styles.attendance}>
          <div className={styles["attendance-list"]}>
            <h1>Your Medical Records</h1>
            <table className={styles.table}>
              <tbody>
                {user.uploadedPDFs.map((pdf, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{pdf}</td>
                    <td>
                      <a
                        href={`http://localhost:8000/dashboard/${pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button>View</button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        </section>
      )}
    </div>
  );
};

export default PatientDashboard;
