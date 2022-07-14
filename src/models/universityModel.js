import mongoose from "mongoose";

const UniSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Uni = mongoose.model("Uni", UniSchema);

export default Uni;
