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
    vehicle: {
      type: String,
    },
    concern: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "New",
        "Need to Assign",
        "in Progress",
        "Waiting on Parts",
        "Waiting for Approval",
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
