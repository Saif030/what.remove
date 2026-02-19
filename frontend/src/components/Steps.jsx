const Steps = () => {
    const steps = [
        {
            title: "Upload image",
            description: "This is a demo text, will replace it later. This is a demo..",
            image: "upload_icon.svg"
        },
        {
            title: "Remove background",
            description: "This is a demo text, will replace it later. This is a demo..",
            image: "remove_bg_icon.svg"
        },
        {
            title: "Download image",
            description: "This is a demo text, will replace it later. This is a demo..",
            image: "download_icon.svg"
        }
    ];

    return (
        <div className="w-full h-fit flex flex-col justify-center items-center gap-4 sm:p-6 p-4 sm:mt-12 mt-8">
            <h2 className="bg-gradient-to-r from-[#353535] to-[#9B9B9B] bg-clip-text text-transparent sm:text-4xl text-2xl font-bold text-center p-2">Steps to remove background<br />image in seconds</h2>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {steps.map((step, index) => (
                    <div key={index} className="bg-white sm:w-[25vw] w-full h-[20vh] flex justify-center gap-4 rounded-lg p-8 shadow-lg">
                        <div>
                            <img src={step.image} alt={step.title} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Steps;