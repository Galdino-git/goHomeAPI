const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
    cpf: {
      type: Number,
      required: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
      required: true,
      unique: true,
    },
    is_Driver: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
    },
    cnh: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Profile", profileSchema);
