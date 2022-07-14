import mongoose from "mongoose";

const TransSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pago: {
      type: String,
      required: true,
    },
    toUser: {
      type: String,
      required: true,
    },
    saldo: {
      type: String,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Trans = mongoose.model("trans", TransSchema);

export default Trans;
