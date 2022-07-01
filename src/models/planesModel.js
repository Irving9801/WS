import mongoose from "mongoose";
const PlanesSchema = mongoose.Schema(
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
    price: {
      type: String,
      required: true,
    },
    descriptionPlane: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Planes = mongoose.model("planes", PlanesSchema);

export default Planes;
