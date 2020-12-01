const mongoose = require("mongoose");

const rideSchema = mongoose.Schema(
  {
    _driver_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    _start_TZ: {
      type: Number,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    _end_TZ: {
      type: Number,
      required: true,
    },
    justification: {
      type: String,
    },
  },
  { timestamps: false }
);

mongoose.model("Ride", rideSchema);
