const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    repairOrder: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    vehicle: {
      type: String,
    },
    phone: {
      type: String
    },
    concern: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "New",
        "NTA",
        "in Progress",
        "WOP",
        "WOA",,
        "Parts Here",
        "Completed",
      ],
      default: "New",
    },
    tech: {
      type: String,
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
