import Stripe from "stripe";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

let stripe;
const getStripe = () => {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};


const paymentWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = getStripe().webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      const { userId, credits, plan } = paymentIntent.metadata;

      const user = await User.findOne({ clerkId: userId });

      let ispaymentCompleted = false;

      if(paymentIntent.status === "succeeded"){
        ispaymentCompleted = true;
      }

      if (user) {
        user.credits += Number(credits);
        await user.save();

       const transaction = await Transaction.create({
          clerkId: userId,
          plan,
          isPaymentCompleted : ispaymentCompleted,
          amount: paymentIntent.amount / 100,
          credits,
        });
      }
    }

    return res.json({ success: true });
  }

export default paymentWebhook;