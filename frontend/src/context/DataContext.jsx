import { createContext, use } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";


export const DataContext = createContext()

const DataProvider = ({children}) => {
    const [data ,setData] = useState(null);

    const { getToken } = useAuth();

    const fetchData = async () => {
        try{
            const token = await getToken();
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/v1/users/credits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = await response.data;
            console.log("Fetched data:", result);
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch data. Please try again later.");
        }
    }

    return (
        <DataContext.Provider value={{ data, fetchData }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;