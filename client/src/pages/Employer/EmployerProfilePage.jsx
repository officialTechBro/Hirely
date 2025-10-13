import { Building2, Mail, Edit } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPath"
import toast from 'react-hot-toast'
import uploadImage from "../../utils/uploadImage"


import DashboardLayout from "../../components/Layouts/DashboardLayout"
import { useState } from "react"

const EmployerProfilePage = () => {

  const {user, updateUser} = useAuth()

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    companyName: user?.companyName || "",
    companyDescription: user?.companyDescription || "",
    companyLogo: user?.companyLogo || "",
  })

  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({...profileData})
  const [uploading, setUploading] = useState({avatar: false, logo:false})
  const [saving, setSaving] = useState(false)


  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = async (File, type) => {}

  const handleImageChange = (e, type) => {}

  const handleSave = async () => {

  }

  const handleCancel = () => {
    setFormData({...profileData})
    setEditMode(false)
  }

  return (
    <DashboardLayout activeMenu="company-profile"> 
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-wjite rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-8 py-6 flex justify-between items-center">
              <h1 className="text-xl font-medium text-white">Employer Profile</h1>
              <button
                onClick={() => setEditMode(true) }
                className="bg-white/10 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200">Personal Information</h2>

                  {/* Avatar/name */}
                  <div className="flex items-center space-x-4">
                      <img 
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-teal-500" 
                      />
                      <div className="">
                        <h3 className="text-lg font-semibold text-gray-800">{profileData.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>{profileData.name}</span>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
export default EmployerProfilePage