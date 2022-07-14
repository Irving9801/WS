import mongoose from "mongoose";

const RutaSchema = mongoose.Schema(
  {
    nameRuta: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ruta = mongoose.model("Ruta", RutaSchema);

export default Ruta;
