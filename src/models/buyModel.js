import mongoose from "mongoose";

const BuySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: Number,
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
