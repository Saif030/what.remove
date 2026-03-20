import { Link } from "react-router-dom"
import { useClerk , useUser } from "@clerk/clerk-react"
import { UserButton } from "@clerk/clerk-react"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { DataContext } from "../context/DataContext"

const NavBar = () => {
      const { openSignIn } = useClerk();
      const { isSignedIn, user , isLoaded } = useUser();
      const { credits , fetchData } = useContext(DataContext)

      useEffect(() => {
          fetchData();
      }, [isSignedIn]);

    return (
        <div className="w-full px-4 sm:px-0 sm:h-20 h-16 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
                <img className="sm:h-7 h-5 object-contain" src="/logo.svg" alt="logo" />
                {/* <h1 className="text-xl font-semibold">what.remove</h1> */}
            </Link>
            <div className="flex sm:gap-4 gap-2">
                <Link to="/plans" className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                    <img src="/credit_icon.png" alt="credit" className="w-5 h-5" />
                    <div className="flex gap-2 items-center">
                        <p className="text-sm font-normal hidden sm:block">Credits lefts :</p>
                        <p className="text-sm font-semibold">{credits}</p>
                    </div>
                </Link>
                {
                    isLoaded && !isSignedIn ? (
                        <button onClick={openSignIn} className="bg-[#313131] flex items-center gap-2 text-white sm:px-8 px-6 sm:py-3 py-1.5 rounded-full cursor-pointer">
                            Get Started
                            <img className="w-4 h-4" src="/arrow_icon.svg" alt="arrow" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 sm:px-4 px-2 sm:py-2 py-1.5 bg-white rounded-full">
                            <UserButton />
                            <div>
                                <p className="sm:text-sm text-xs font-medium">{user?.fullName}</p>
                                <p className="sm:text-xs text-xs text-gray-500">{user?.emailAddresses[0].emailAddress}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default NavBar;