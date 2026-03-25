import { createContext, use } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const DataContext = createContext()

const DataProvider = ({children}) => {
    const [data ,setData] = useState(null);
    const [image, setImage] = useState(null);
    const [resultImage, setResultImage] = useState(false);

    const { getToken } = useAuth();
    const { isSignedIn } = useUser();
    const { openSignIn } = useClerk();
    const navigate = useNavigate();

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

            const response = await axios.post("http://localhost:3000/api/v1/image/remove-bg", formData, {
                 headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const result = response.data;
            setResultImage(result);
            console.log("Image uploaded successfully:", result);
            toast.success("Background removed successfully!");

        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchData = async () => {
        try{
            const token = await getToken();
            const response = await axios.get("http://localhost:3000/api/v1/users/credits", {
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
        <DataContext.Provider value={{ data, fetchData , removeBg, image, resultImage ,resultImage}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;