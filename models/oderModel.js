import mongoose from "mongoose";

const OderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shippes", "Deliverd", "Cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OderSchema);
