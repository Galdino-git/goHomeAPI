const mongoose = require("mongoose");

const chat_historySchema = mongoose.Schema(
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
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    _date_TZ: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

mongoose.model("Chat_History", chat_historySchema);
