import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { DataContext } from "../context/DataContext.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);


const CheckoutPage = () => {
  const { clientSecret } = useContext(DataContext);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-[79vh]">
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <CheckoutForm clientSecret={clientSecret} />
      </Elements>
    </div>
  );
};

export default CheckoutPage;