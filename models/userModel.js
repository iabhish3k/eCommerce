import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 5,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    answer: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
//TODO: where users is refrance in mongodb which help to us to use db <3
