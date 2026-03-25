import { createContext, use } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext()
export const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const DataProvider = ({children}) => {
    const [data ,setData] = useState(null);
    const [image, setImage] = useState(null);
    const [resultImage, setResultImage] = useState(false);
    const [clientSecret, setClientSecret] = useState(null);

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();

    const handleCheckout  = async (planId) => {
        const stripe = await stripePromise;

        try{
            if(!isSignedIn){
                openSignIn();
                return;
            }

            const token = await getToken();
            const response = await axios.post("https://what-remove-3wds-liard.vercel.app/api/v1/payment/payment-intent", {
                priceId: planId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { clientSecret } = response.data;
            setClientSecret(clientSecret);
            console.log("Checkout session result:", clientSecret);
            navigate("/checkout");

        }catch(error){
            console.log("Error during checkout:", error);
            toast.error("An error occurred during checkout. Please try again.");
        }
    }

    const removeBg = async (image) => {

        try{
            if(!isSignedIn){
                openSignIn();
                return;
            }
            setImage(image);
            setResultImage(false);
            navigate("/result");

            const token = await getToken();
            const formData = new FormData();
            formData.append("image", image);

            const response = await axios.post("https://what-remove-3wds-liard.vercel.app/api/v1/image/remove-bg", formData, {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = response.data;
            if(result.success){
                setResultImage(result);
                toast.success("Background removed successfully!");
            } else {
                navigate("/plans");
                toast.error(result.message);
            }

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchData = async () => {
        try{
            const token = await getToken();
            const response = await axios.get("https://what-remove-3wds-liard.vercel.app/api/v1/users/credits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = response.data;
            console.log("Fetched credits:", result.credits);
            setData(result.credits);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data. Please try again later.");
        }
    }

    return (
        <DataContext.Provider value={{ data, fetchData , removeBg, image, resultImage ,resultImage , handleCheckout ,clientSecret}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;