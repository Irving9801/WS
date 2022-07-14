import mongoose from "mongoose";

const CompanySchema = mongoose.Schema(
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

const Company = mongoose.model("Company", CompanySchema);

export default Company;
