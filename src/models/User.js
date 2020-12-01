const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    _id_Secret_Question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Secret_Question",
      required: true,
    },
    secret_Answer: {
      type: String,
      required: true,
    },
    _id_Profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("User", userSchema);
