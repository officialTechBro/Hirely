import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useState } from "react"
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
import InputField from "../../components/Input/InputField"
import SelectField from "../../components/Input/SelectField"
import TextareaField from "../../components/Input/TextareaField"
import JobPostingPreview from "../../components/Cards/JobPostingPreview"

const JobPostingForm = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const jobId = location.state?.jobId || null

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: ""
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    const jobPayload = {
        title: formData.jobTitle,
        description: formData.description,
        requirements: formData.requirements,
        location: formData.location,
        category: formData.category,
        type: formData.jobType,
        salaryMin: formData.salaryMin,
        salaryMax: formData.salaryMax,
    }

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload)
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayload)

      if (response.status === 200 || response.status === 201) {
        toast.success(
          jobId ? "Job Updated Successfully" : "Job Posted Successfully"
        )
        setFormData({
          jobTitle: "",
         location: "",
         category: "",
         jobType: "",
         description: "",
         requirements: "",
         salaryMin: "",
         salaryMax: "",
        })

        navigate("/employer-dashboard")
        return
      }

      console.error("Unexpected response:", response)
      toast.error("Something went wrong. Please try again")

    } catch (error) {
      if (error.response?.data?.message) {
        console.error("API Error", error.response.data.message)
        toast.error("Something went wrong. Please try again")
      } else {
        console.error("Unexpected Error", error)
        toast.error("Failed to post/update job. Please try again")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Form validation helper
  const validateForm = (formData = {}) => {
  const errors = {}

  const jobTitle = formData.jobTitle?.trim?.() || ""
  const location = formData.location?.trim?.() || ""
  const category = formData.category || ""
  const jobType = formData.jobType || ""
  const description = formData.description?.trim?.() || ""
  const requirements = formData.requirements?.trim?.() || ""
  const salaryMin = formData.salaryMin
  const salaryMax = formData.salaryMax

  if (!jobTitle) errors.jobTitle = "Job title is required"
  if (!location) errors.location = "Location is required"
  if (!category) errors.category = "Please select a category"
  if (!jobType) errors.jobType = "Please select a job type"
  if (!description) errors.description = "Job description is required"
  if (!requirements) errors.requirements = "Job requirements are required"

  if (salaryMin === "" || salaryMax === "") {
    errors.salary = "Both minimum and maximum salary are required"
  } else if (Number(salaryMin) >= Number(salaryMax)) {
    errors.salary = "Maximum salary must be greater than minimum salary"
  }

  return errors
}

  const isFormValid = (formData) => {
    const validationErrors = validateForm(formData)
    return Object.keys(validationErrors).length === 0
  }

  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    )
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
                  disabled={isSubmitting || !isFormValid(formData)}
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
            <div className="space-y-6">
            <InputField
              label="Job Title"
              id="jobTitle"
              placeholder="e.g., Senior Frontend Developer"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              error={errors.jobTitle}
              required
              icon={Briefcase}
            />

            {/* Location */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-4 sm:space-y-0">
                <div className="flex-1">
                  <InputField
                    label="Location"
                    id="location"
                    placeholder="e.g., Lagos, LG"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    error={errors.location}
                    required
                    icon={MapPin}
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <SelectField 
                label="Category"
                id="category"
                placeholder="Select a category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                error={errors.category}
                options={CATEGORIES}
                required
                icon={Users}
              />

              <SelectField 
                label="Job Type"
                id="jobType"
                placeholder="Select job type"
                value={formData.jobType}
                onChange={(e) => handleInputChange("jobType", e.target.value)}
                error={errors.jobType}
                options={JOB_TYPES}
                required
                icon={Briefcase}
              />
            </div>

            {/* Description */}
            <TextareaField 
                label="Job Description"
                id="description"
                placeholder="Describe the role and responsibilities..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={errors.description}
                required
                icon={Users}
                helperText="Describe the main responsibilities, day-to-day expectations, and highlight why this role is a great opportunity."
            />

            {/* Requirements */}
            <TextareaField 
                label="Requirements"
                id="requirements"
                placeholder="Describe the role and responsibilities..."
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                error={errors.requirements}
                required
                helperText="List the required skills, experience level, and any preferred qualifications for this role."
            />

            {/* Salary Range */}
            <div className="space-y-2">
              <label htmlFor="block text-sm font-medium text-gray-700">
                Salary Range <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="number" 
                    placeholder="Min" 
                    value={formData.salaryMin}
                    onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    value={formData.salaryMax}
                    onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20 focus:border-teal-500 transition-colors duration-200"
                  />
                </div>
              </div>
              {errors.salary && (
                <div className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.salary}</span>
                </div>
              )}
            </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isFormValid(formData)}
                  className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-400 disabled:cursor-not-allowed outline-none transition-colors duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Publish Job
                    </>
                  )}
                </button>
              </div>
          </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default JobPostingForm