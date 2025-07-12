const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    description: String,
    category: String,
    type: {
      type: String,
      enum: ["swap", "redeem"],
      default: "swap",
    },
    size: String,
    condition: String,
    tags: [String],
    points: {
      type: Number,
      default: 0,
    },
    images: [String],
    status: {
      type: String,
      enum: ["available", "pending", "swapped"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
