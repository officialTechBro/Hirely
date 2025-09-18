import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useState, useEffect } from "react"
import {
  AlertCircle,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Send
} from 'lucide-react'
import { API_PATHS } from "../../utils/apiPath"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { CATEGORIES, JOB_TYPES } from "../../utils/data"
import toast from 'react-hot-toast'


const JobPostingForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const jobId = location.state?.jobId || null

  const [formState, useFormState] = useState({
    jobTitle: "",
    location: "",
    category: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  })

  const [errors, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  // Form validation helper
  const validateForm = (formData) => {
    const errors = {}

    return errors
  }

  const isFormValid = (formData) => {
    const validationErrors = validateForm(formData)
    return Object.keys(validationErrors).length === 0
  }

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-purple-50/20 py-8 px-4 sm:px-4 lg:px-8" >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Post a New Job
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Fill out the form below to create your job posting
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsPreview(true)}
                  disabled={!isFormValid()}
                  className="group flex items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-600 hover:text-white 
                    bg-white/50 hover:bg-gradient-to-r hover:from-teal-500 hover:to-green-600 border border-gray-200 
                    hover:border-transparent rounded-xl transition-all duration-300 shadow-lg shadow-gray-100 hover:shadow-xl 
                    transform hover:-translate-y-0.5"
                >
                  <Eye className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default JobPostingForm