const mongoose = require("mongoose");

const ride_passengerSchema = mongoose.Schema(
  {
    _ride_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ride",
      required: true,
    },
    _passenger_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    justification: {
      type: String,
    },
  },
  { timestamps: false }
);

mongoose.model("Ride_Passenger", ride_passengerSchema);
