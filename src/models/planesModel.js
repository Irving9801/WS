import mongoose from "mongoose";
const PlanesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    nameProdut: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    descriptionProduct: {
      type: String,
      required: true,
    },
    imagesList: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Planes = mongoose.model("products", PlanesSchema);

export default Planes;
