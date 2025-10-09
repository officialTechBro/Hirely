import { Download, X } from "lucide-react"
import { useState } from "react"
import { getInitials } from "../../utils/helper"
import moment from "moment"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPath"
import toast from "react-hot-toast"

import StatusBadge from "../Layouts/StatusBadge"
const statusOptions = ["Applied", "In Review", "Rejected", "Accepted"]

const ApplicationProfilePreview = ({selectedApplicant, setSelectedApplicant, handleDownloadResume, handleClose}) => {
    const [currentStatus, setCurrentStatus] = useState(selectedApplicant.status)
    const [loading, setLoading] = useState(false.status)

    const onChangeStatus = async (e) => {
        const newStatus = e.target.value
        setCurrentStatus(newStatus)
        setLoading(true)

        try {
            const res = await axiosInstance.put(API_PATHS.APPLICATIONS.UPDATE_STATUS(selectedApplicant._id), {
                staus: newStatus
            })

            if (res.status === 200) {
                // Update local state
                setSelectedApplicant({...selectedApplicant._id, status: newStatus})
                toast.success("Application status updated successfully")
            }
        } catch (error) {
            console.error("Error updating status", error)
            setCurrentStatus(selectedApplicant.status)
        } finally {
            setLoading(false)
        }
    }

    
  return <div className="">
    <div className="">
        {/* Modal Header */}
        <div className="">
            <h3 className="">Applicant Profile</h3>
            <button
                onClick={() => handleClose()}
                className=""
            >
                <X className="" />
            </button>
        </div>

        {/* Modal Conten */}
        
    </div>
  </div>
}
export default ApplicationProfilePreview