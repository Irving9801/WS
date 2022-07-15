import mongoose from "mongoose";

const BuySchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },
    namePlane: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    Saldo: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Buy = mongoose.model("buy", BuySchema);

export default Buy;
