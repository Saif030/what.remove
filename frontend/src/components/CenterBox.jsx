const CenterBox = () => {
    return (
        <div className="w-full sm:h-[75vh] h-screen flex flex-col justify-center items-center sm:flex-row sm:p-6 p-4">
            <div className="w-full sm:w-1/2 h-full flex flex-col justify-center">
                <h1 className="sm:text-6xl text-4xl font-semibold leading-tight">Remove the<br /><span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">background</span> from<br />images for free.</h1>
                <p className="font-medium text-[#515151] text-xs mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />Lorem Ipsum has been the industry's standard dummy text ever</p>
                <input type="file" id="file-input" className="hidden" />
                <label htmlFor="file-input" className="cursor-pointer">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 inline-flex items-center text-white sm:px-8 px-6 sm:py-3 py-2 rounded-full mt-4">
                        <img src="/upload_btn_icon.svg" alt="Upload" className="sm:w-5 sm:h-5 w-4 h-4 mr-3" />
                        Upload Image
                    </div>
                </label>
            </div>
            <div className="w-full sm:w-1/2 h-full flex items-center rounded-2xl overflow-hidden">
                <img src="/header_img.png" alt="Header" className="w-full h-full object-contain" />
            </div>
        </div>
    )
}

export default CenterBox;