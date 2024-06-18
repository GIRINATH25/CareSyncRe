import React, { useEffect, useState } from "react";
import styles from "./pdash.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientDashEdit = () => {
  const [email, setEmail] = useState("shibi2021cce@sece.ac.in");
  const [user, setUser] = useState(null);

  const loadFile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("imageUrl", e.target.files[0]);
      const response = await axios.put("/dashboard/editRecord", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.info(response.data.message);
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/dashboardPatient", {
          params: { email },
        });
        setUser(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error: " + err);
      }
    };
    fetchData();
  }, [email]);

  useEffect(() => {
    const updataData = async () => {
      try {
        const response = await axios.put("/dashboard/edit", user);
        toast.info(response.data.message);
      } catch (err) {
        console.log("Error: " + err);
      }
    };

    if (user !== null) {
      updataData();
    }
  }, [user]);

  const handleEdit = (field) => {
    const newValue = prompt(`Enter ${field}:`);
    setUser((prevUser) => ({
      ...prevUser,
      [field]: newValue,
    }));
  };

  const handleAlert = async (e) => {
    e.preventDefault();
    try {
      let add = prompt(`Enter hospitel address to alert`);
      console.log(add);
    } catch (err) {
      console.log("Error:" + err);
    }
  };

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
              <button onClick={() => handleEdit("username")}>Edit</button>
            </div>
            <div className={styles.card}>
              <h4>
                <span className={styles.space1}>Age</span>
                <span>:</span>
                <span className={styles.space1}>{user.age}</span>
                <button onClick={() => handleEdit("age")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Blood Group</span>
                <span>:</span>
                <span className={styles.space1}> {user.bloodgroup}</span>
                <button onClick={() => handleEdit("bloodgroup")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Gender</span>
                <span>:</span>
                <span className={styles.space1}> {user.gender}</span>
                <button onClick={() => handleEdit("gender")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Phone Number</span>
                <span>:</span>
                <span className={styles.space1}> {user.phone}</span>
                <button onClick={() => handleEdit("phone")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Nominee Name</span>
                <span>:</span>
                <span className={styles.space1}> {user.Nominee}</span>
                <button onClick={() => handleEdit("Nominee")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Relation</span>
                <span>:</span>
                <span className={styles.space1}>{user.NomineeRelation}</span>
                <button onClick={() => handleEdit("NomineeRelation")}>
                  Edit
                </button>
              </h4>
              <h4>
                <span className={styles.space1}>Nominee Phone</span>
                <span>:</span>
                <span className={styles.space1}> {user.NomineePhone}</span>
                <button onClick={() => handleEdit("NomineePhone")}>
                  Edit
                </button>{" "}
              </h4>
            </div>
            <div className={styles.card}>
              <h4>
                <span className={styles.space1}>BP</span>
                <span>:</span>
                <span className={styles.space1}> {user.bp}</span>
                <button onClick={() => handleEdit("bp")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Sugar Level</span>
                <span>:</span>
                <span className={styles.space1}> {user.sugar}</span>
                <button onClick={() => handleEdit("sugar")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Heart Rate</span>
                <span>:</span>
                <span className={styles.space1}> {user.heartrate}</span>
                <button onClick={() => handleEdit("heartrate")}>Edit</button>
              </h4>
              <h4>
                <span className={styles.space1}>Glucose</span>
                <span>:</span>
                <span className={styles.space1}> {user.glucose}</span>
                <button onClick={() => handleEdit("glucose")}>Edit</button>
              </h4>
            </div>
            <div className={styles.card}>
              <h1>Last Login</h1>
              <div style={{ marginRight: "auto" }}>
                Last view: {user.lastview}
              </div>
              <a
                href={`https://api.whatsapp.com/send?phone=${
                  user.phone
                }&text=${"don't hospitel"}`}
                target="_blank"
              >
                <input
                  type="submit"
                  style={{ marginTop: "20%", width: "50%", height: "5vh" }}
                  value="Alert"
                />
              </a>
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
                  <tr>
                    <td colSpan="3">
                      <input type="file" accept="image/*" onChange={loadFile} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>
      )}
    </div>
  );
};

export default PatientDashEdit;
