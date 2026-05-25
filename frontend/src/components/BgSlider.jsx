import { useState, useCallback } from "react";

const BgSlider = () => {
    const [value, setValue] = useState(50);

    const handleChange = useCallback((e) => {
        setValue(Number(e.target.value));
    }, []);
    return (
        <div className="flex flex-col items-center justify-center mt-8 sm:mt-18 px-4 sm:px-0">
             <h1 className="text-2xl mb-2 sm:mb-8 sm:text-4xl font-bold bg-gradient-to-r from-[#353535] to-[#9B9B9B] text-center bg-clip-text text-transparent p-2">Remove Background with High <br /> Quality and Accuracy</h1>
             <div className="w-full max-w-3xl overflow-hidden relative m-auto rounded-xl bg-red-400">
                <img src="/image_w_bg.png" alt="slider-bg" className="w-full object-cover" style={{clipPath: `inset(0 ${100 - value}% 0 0)`}} />
                <img src="/image_wo_bg.png" alt="slider-bg" className="w-full absolute top-0 left-0 object-cover" style={{clipPath: `inset(0 0 0 ${value}%)`}} />
                <div className="h-full w-1 absolute top-0 bg-white" style={{ left: `${value}%` }}>
                </div>
                <input type="range" min="0" max="100" value={value} onChange={handleChange} className="slider w-full z-10 absolute top-0 left-0 h-full" />
             </div>
        </div>
    )
}

export default BgSlider;