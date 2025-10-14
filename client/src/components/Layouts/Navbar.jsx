import { useState, useEffect } from "react"
import { Briefcase, Bookmark } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ProfileDropDown from "./ProfileDropDown"


const Navbar = () => {
    const {user, logout, isAuthenticated} = useAuth()
    const navigate = useNavigate()
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

    // Close dropdown when click outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (profileDropdownOpen) {
                setProfileDropdownOpen(false)
            }
        }

        document.addEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [profileDropdownOpen])

  return <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
    <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
            <Link to="/find-jobs" className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gradient-to-r from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-900 font-bold text-lg">Hirely</span>
            </Link>

            {/* Authentication */}
            <div className="flex items-center space-x-3">
                {user && (
                    <button
                        className="p-2 rounded-xl hover:bg-gray-200 transition-colors duration-200 relative border border-gray-200"
                        onClick={() => navigate("/saved-jobs")}
                    >
                        <Bookmark className="h-5 w-5 text-gray-500" />
                    </button>
                )}

                {isAuthenticated ? (
                    <ProfileDropDown 
                        isOpen={profileDropdownOpen}
                        onToggle={(e) => {
                            e.stopPropagation()
                            setProfileDropdownOpen(!profileDropdownOpen)
                        }}
                        avatar={user?.avatar || ""}
                        companyName={user?.name || ""}
                        email={user?.email || ""}
                        role={user?.role || ""}
                        onLogout={logout}
                    />
                ) : (
                     <>
                        <a 
                            href="/login"
                            className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-gray-500 border border-gray-300"
                        >
                            Login
                        </a>
                        <a 
                            href="/signup"
                            className="bg-teal-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-teal-700 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Sign Up
                        </a>
                    </>
                )}
            </div>
        </div>
    </div>
  </header>
}
export default Navbar