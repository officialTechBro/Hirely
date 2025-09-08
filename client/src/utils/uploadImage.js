import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imgFile) => {
    const formData = new FormData()
    // Append image file to form data
    formData.append('image', imgFile)

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                // Set header for file upload
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.error("Error uploading the image", error)
        throw error // Rethrow error for handling
    }
}

export default uploadImage