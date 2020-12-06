const mongoose = require("mongoose");

const carSchema = mongoose.Schema(
  {
    renavam: {
      type: String,
      required: true,
      unique: true,
    },
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    license_plate: {
      type: String,
      required: true,
      unique: true,
    },
    _id_Profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Car", carSchema);
