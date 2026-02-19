import { useState } from "react";

const Result = () => {
    const [originalImage, setOriginalImage] = useState(null);
    const [resultImage, setResultImage] = useState(null);
    return (
        <div className="sm:w-7xl bg-gray-100 w-full mx-auto min-h-[79vh] flex flex-col items-center justify-center">
            <div className="bg-white w-80 rounded-lg p-8 flex flex-col items-center w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="sm:w-1/2 w-full h-[60vh] flex flex-col justify-center p-6 gap-4">
                    <h1 className="text-lg text-gray-600 font-semibold">Orignal</h1>
                    <img className="w-full h-full object-contain rounded-xl" src="/image_w_bg.png" alt="" />
                    </div>
                    <div className="sm:w-1/2 w-full h-[60vh] flex flex-col justify-center p-6 gap-4">
                    <h1 className="text-lg text-gray-600 font-semibold">Background Removed</h1>
                    <img className="w-full h-full object-contain rounded-xl" src="/image_wo_bg.png" alt="" />
                    </div>
                </div>
                <div className="flex w-full items-center justify-end px-6 flex-row gap-2">
                    <button className="border sm:text-sm text-xs font-semibold border-blue-500 text-blue-500 px-10 py-3 rounded-full cursor-pointer">Try Another</button>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 inline-flex items-center text-white sm:px-10 px-6 sm:py-3 py-2 rounded-full cursor-pointer">Download</button>
                </div>

            </div>
        </div>
    )
}

export default Result;