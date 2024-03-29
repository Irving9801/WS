import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    typeUser: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    Ruta: {
      type: String,
      required: false,
    },
    company: {
      type: String,
      required: false,
    },
    university: {
      type: String,
      required: false,
    },
    identity:{
      type: String,
      unique: true,
    },
    myRuta: {
      typeof: String,
      required: false,
    },
    profile: {
      type: String,
      required: false,
    },
    carnet: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
