const Footer = () => {
    return (
        <footer className="w-full h-fit flex justify-between items-center px-4 sm:px-0 py-4">
            <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-6 gap-2">
                <img className="sm:h-7 h-6 object-contain" src="/logo.svg" alt="logo" />
                <div className="bg-gray-400 h-[4vh] w-[2px] sm:block hidden"></div>
                <p className="sm:text-sm text-xs text-gray-600">All right reserved. Copyright @bg removal</p>
            </div>
            <div className="flex gap-2">
                <img className="sm:h-9 h-8 object-cover" src="./google_plus_icon.svg" alt="google plus" />
                <img className="sm:h-9 h-8 object-cover" src="./facebook_icon.svg" alt="facebook" />
                <img className="sm:h-9 h-8 object-cover" src="./twitter_icon.svg" alt="twitter" />
            </div>
        </footer>
    )
}

export default Footer;