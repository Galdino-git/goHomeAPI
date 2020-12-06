const express = require("express");
const mongoose = require("mongoose");
const Car = mongoose.model("Car");

const router = express.Router();

router.post("/car/create", async (req, res) => {
  try {
    const { renavam, model, color, license_plate, _id_Profile } = req.body;
    const car = new Car({ renavam, model, color, license_plate, _id_Profile });
    await car.save();
    res.send(car);
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

router.get("/car/readByProfileId", async (req, res) => {
  try {
    const { _id_Profile } = req.body;
    const car = await Car.find({ _id_Profile });
    res.send(car);
  } catch (error) {
    return res.status(422).send(error.message);
  }
});

module.exports = router;
