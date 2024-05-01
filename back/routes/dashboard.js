const express = require("express");
const router = express.Router();
const doctor = require("../models/Doctors");
const patient = require("../models/Patient");
const path = require("path");
const upload = require("../middleware/storeFiles");

router.post("/dashboardDoctor", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await doctor.findOne({ email: email });

    if (!user) {
      return res.json({ message: "No data found" });
    }

    res.json(user);
  } catch (err) {
    console.log("Error: " + err);
  }
});

router.get("/dashboard/:pic", async (req, res) => {
  try {
    picUrl = req.params.pic;
    picture = path.join(__dirname, "../uploads/", picUrl);
    res.sendFile(picture);
  } catch (err) {
    console.log("Error: " + err);
  }
});

router.get("/dashboardPatient", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await patient.findOne({ email: email });

    if (!user) {
      return res.json({ message: "No data found" });
    }

    res.json(user);
  } catch (err) {
    console.log("Error: " + err);
  }
});

router.put(
  "/dashboard/editRecord",
  upload.single("imageUrl"),
  async (req, res) => {
    try {
      const email = req.body.email;

      const hasEmail = await patient.findOne({ email: email });

      const arr = hasEmail.uploadedPDFs;

      arr.push(req.file.filename);

      const store = await patient.updateOne(
        { email: email },
        { $set: { uploadedPDFs: arr } }
      );

      if (!store) {
        return res.json({ message: "Error on storing file" });
      }

      res.json({ message: "sucessfully uploaded" });
    } catch (err) {
      console.log("Error: " + err);
    }
  }
);

router.put("/dashboard/edit", async (req, res) => {
  try {
    const update = req.body;

    const hasEmail = await patient.findOne({ email: update.email });

    if (!hasEmail) {
      return res.json({ message: "Error on storing details" });
    }

    const store = await patient.updateOne(
      { email: hasEmail.email },
      {
        $set: {
          username: update.username,
          age: update.age,
          bloodgroup: update.bloodgroup,
          phone: update.phone,
          Nominee: update.Nominee,
          NomineeRelation: update.NomineeRelation,
          NomineePhone: update.NomineePhone,
          bp: update.bp,
          sugar: update.sugar,
          heartrate: update.heartrate,
          glucose: update.glucose,
        }
      }
    );

    if(!store){
        return res.json({message:"Error on updating details"});
    }
    res.json({ message: "sucessfully uploaded" });
  } catch (err) {
    console.log("Error: " + err);
  }
});

module.exports = router;
