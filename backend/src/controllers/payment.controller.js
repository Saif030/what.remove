import Stripe from 'stripe';
import User from '../models/user.model.js';

let stripe;

const getStripe = () => {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

const paymentController = async (req, res) => {
    const { userId } = req.auth();

    if(!userId){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }
  try {
    const { priceId } = req.body;
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    let amount,plan,credits,currency;

    switch (priceId) {
      case "plan_29":
        amount = 100; 
        plan = "Basic";
        credits = 500;
        currency = "inr";
        break;
      case "plan_03":
        amount = 500; 
        plan = "Pro";
        credits = 1000;
        currency = "inr";
        break;
      case "plan_06":
        amount = 1000;
        plan = "Premium";
        credits = 2500;
        currency = "inr";
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid plan ID!" });
    }

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId,
        credits,
        plan,
      },
    });

    return res.json({
      clientSecret: paymentIntent.client_secret,
    });
   
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export { paymentController };