const TryNow = () => {
    return (
        <div className="flex flex-col justify-center items-center p-8">
            <h1 className="text-2xl mb-2 sm:mb-8 sm:text-4xl font-bold bg-gradient-to-r from-[#353535] to-[#9B9B9B] bg-clip-text text-transparent p-2">See the magic. Try now</h1>
            <input type="file" className="hidden" id="file-input" />
            <label htmlFor="file-input" className="cursor-pointer">
                <div className="bg-gradient-to-r from-[#e1a100] to-[#f7c548] inline-flex items-center text-white sm:px-8 px-6 sm:py-3 py-2 rounded-full mt-4">
                    <img src="/upload_btn_icon.svg" alt="Upload" className="sm:w-5 sm:h-5 w-4 h-4 mr-3" />
                    Upload Image
                </div>
            </label>
        </div>
    )
}

export default TryNow;