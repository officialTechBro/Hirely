// eslint-disable-next-line no-unused-vars
import {motion} from 'framer-motion'
import {Briefcase} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const Header = () => {
    const {user, isAuthenticated} = useAuth()
    const navigate = useNavigate()

  return <motion.header
    initial={{opacity: 0, y:-20}}
    animate={{opacity: 1, y:0}}
    transition={{duration: 0.6}}
    className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
  >
    <div className="container mx-auto px-4">
        <div className=" flex items-center justify-between h-16">
            {/* Logo  */}
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-green-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-500-900">Hirely</span>
            </div>

            {/* Navigation link -  hidden on mobile */}
            <nav className="hidden md:flex items-center space-x-8">
                <a
                    onClick={() => navigate('find-jobs')}
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                    Find Jobs
                </a>
                <a
                    onClick={() => {
                        navigate(isAuthenticated && user.role === "employer" ? "/employer-dashboard" : "/login")
                    }}
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                    For Employers
                </a>
            </nav>
                
            {/* Auth Button  */}
            <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-700">Welcome, {user?.name}</span>
                        <a 
                            href={user?.role === "employer" ? "/employer-dashboard" : '/find-jobs'}
                            className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-2 rounded-lg font-medium hover:from-teal-700 hover:to-green-700 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Dashboard
                        </a>
                    </div>
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
  </motion.header>
}
export default Header