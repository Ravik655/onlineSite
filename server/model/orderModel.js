import mongoose from "mongoose";
import { type } from "os";

const orderSchema = new mongoose.Schema(
  {
    product: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
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
      enum: ["Not Process", "Processing", "Shiping", "deliverd", "cancel"],
    },
    vendorStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },

  { timestamps: true }
);
export default mongoose.model("Order", orderSchema);
