import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        }
      },
    ],
    shippingCost: {
      type: Number,
      //required: true,
      min: 0,
    },
    totalCost: {
      type: Number,
      //required: true,
      min: 0,
    },
    orderBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true
    }
  },
  {
    timestamps: true,
  }
);

function arrayMinLength(val) {
  return val.length > 0;
}

export const Cart = mongoose.model("Cart", cartSchema);



// const cartItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );