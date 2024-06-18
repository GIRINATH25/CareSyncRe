import React, { useEffect, useState } from "react";
import styles from "./pdash.module.css";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PatientDashboard = () => {
  const { email } = useLocation().state || {};
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(email);
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
              <h4>
                <span className={styles.space1}>Age</span>
                <span>:</span>
                <span className={styles.space1}>{user.age}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Blood Group</span>
                <span>:</span>
                <span className={styles.space1}> {user.bloodgroup}</span>
              </h4>
              <h4>
                <span className={styles.space1}>GENDER</span>
                <span>:</span>
                <span className={styles.space1}> {user.gender}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Phone Number</span>
                <span>:</span>
                <span className={styles.space1}> {user.phone}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Nominee Name</span>
                <span>:</span>
                <span className={styles.space1}> {user.Nominee}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Nominee Relation</span>
                <span>:</span>
                <span className={styles.space1}>{user.NomineeRelation}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Nominee Phone</span>
                <span>:</span>
                <span className={styles.space1}> {user.NomineePhone}</span>{" "}
              </h4>
            </div>
            <div className={styles.card}>
              <h4>
                <span className={styles.space1}>BP</span>
                <span>:</span>
                <span className={styles.space1}> {user.bp}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Sugar Level</span>
                <span>:</span>
                <span className={styles.space1}> {user.sugar}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Heart Rate</span>
                <span>:</span>
                <span className={styles.space1}> {user.heartrate}</span>
              </h4>
              <h4>
                <span className={styles.space1}>Glucose</span>
                <span>:</span>
                <span className={styles.space1}> {user.glucose}</span>
              </h4>
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
