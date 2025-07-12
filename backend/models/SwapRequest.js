// models/SwapRequest.js
const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema(
  {
    requesterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    requesterItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    receiverItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SwapRequest", swapRequestSchema);
