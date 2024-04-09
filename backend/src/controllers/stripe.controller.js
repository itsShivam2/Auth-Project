import stripePackage from "stripe";
import dotenv from "dotenv";

dotenv.config();

const KEY = process.env.STRIPE_API_KEY;
const stripe = stripePackage(KEY);

const createPayment = async (req, res) => {
  try {
    const { tokenId, amount } = req.body;
    const charge = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: "inr",
    });
    res.status(200).json(charge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPayment };
