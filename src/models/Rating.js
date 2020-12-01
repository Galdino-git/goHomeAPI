const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    from_User_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to_User_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Rating", ratingSchema);
