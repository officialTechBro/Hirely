import { Outlet, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ requiredRole }) => {
    const { isAuthenticated, user, loading } = useAuth()
    const location = useLocation()

    if (loading) return null

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
export default ProtectedRoute