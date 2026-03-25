import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";


const Result = () => {
    const { resultImage } = useContext(DataContext);
    const navigate  = useNavigate();

    const { image } = useContext(DataContext);

    const downloadImage = (base64) => {
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${base64}`;
        link.download = `removed-bg-${Date.now()}.png`;
        link.click();
    };

    return (
        <div className="sm:w-7xl bg-gray-100 w-full mx-auto min-h-[79vh] flex flex-col items-center justify-center">
            <div className="bg-white w-80 rounded-lg p-8 flex flex-col items-center w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="sm:w-1/2 w-full h-[60vh] flex flex-col justify-center p-6 gap-4">
                    <h1 className="text-lg text-gray-600 font-semibold">Orignal</h1>
                    {image ? <img className="w-full h-full object-contain rounded-xl" src={URL.createObjectURL(image)} alt="" /> : <img className="w-full h-full object-contain rounded-xl" src="/image_w_bg.png" alt="" />}
                    </div>
                    <div className="sm:w-1/2 w-full h-[60vh] flex flex-col justify-center p-6 gap-4">
                    <h1 className="text-lg text-gray-600 font-semibold">Background Removed</h1>
                    {resultImage ? <img className="w-full h-full object-contain rounded-xl" src={`data:image/png;base64,${resultImage?.image}`} alt="" /> : 
                  <dotlottie-wc
  src="https://lottie.host/e2e81ed0-0f0b-4f06-9a2d-a479c8236236/GEk5ZLEQku.lottie"
  autoplay
  loop
></dotlottie-wc>}
                    </div>
                </div>
                <div className="flex w-full items-center justify-end px-6 flex-row gap-2">
                    <button onClick={() => navigate("/")} className="border sm:text-sm text-xs font-semibold border-blue-500 text-blue-500 px-10 py-3 rounded-full cursor-pointer">Try Another</button>
                    <button onClick={() => downloadImage(resultImage?.image)} className="bg-gradient-to-r from-blue-600 to-purple-600 inline-flex items-center text-white sm:px-10 px-6 sm:py-3 py-2 rounded-full cursor-pointer">Download</button>
                </div>

            </div>
        </div>
    )
}

export default Result;