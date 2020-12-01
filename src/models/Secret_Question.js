const mongoose = require("mongoose");

const secret_questionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: false }
);

mongoose.model("Secret_Question", secret_questionSchema);
