import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home";
import DoctorLogin from "./pages/DoctorLoginRgister/DoctorLogin";
import PatientLogin from "./pages/PatientLogin/PatientLogin";
import DoctorRegister from "./pages/DoctorLoginRgister/DoctorRegister";
import PatientRegister from "./pages/PatientLogin/patientRegister";
import DoctorDashboard from "./pages/DoctorPages/DoctorDashboard";
import PatientDashboard from "./pages/PatientPages/PatientDashboard";
import PatientDashEdit from "./pages/PatientPages/PatientDashEdit";
import Patientfinger from "./pages/PatientLogin/Patientfinger";

function App() {

  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.withCredentials = true;

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Doctorlogin" element={<DoctorLogin />} />
          <Route path="/DoctorRegister" element={<DoctorRegister />} />
          <Route path="/Patientlogin" element={<PatientLogin />} />
          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patientRegister" element={<PatientRegister />} />
          <Route path="/patient/Dashboard" element={<PatientDashboard />} />
          <Route path="/patient/Dashboard/edit" element={<PatientDashEdit />} />
          <Route path="/finger" element={<Patientfinger />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
