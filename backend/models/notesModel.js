const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    ticket:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ticket",

    },
    text: {
      type: String,
      required: [ true, "Please Add Comment"]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
