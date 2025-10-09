export const BASE_URL = "http://localhost:8000/";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",        // Signup
    LOGIN: "/api/auth/login",              // Authenticate user & return JWT token
    GET_PROFILE: "/api/user/profile",      // Get logged-in user details
    UPDATE_PROFILE: "/api/user/profile",   // Update profile details
    DELETE_RESUME: "/api/user/resume",     // Delete Resume details
  },

  DASHBOARD: {
    OVERVIEW: "/api/analytics/overview",
  },

  JOBS: {
    GET_ALL_JOBS: "/api/job",
    GET_JOB_BY_ID: (id) => `/api/job/${id}`,
    POST_JOB: "/api/job",
    GET_JOBS_EMPLOYER: "api/job/get-jobs-employer",
    UPDATE_JOB: (id) => `/api/job/${id}`,
    TOGGLE_CLOSE: (id) => `/api/job/${id}/toggle-close`,
    DELETE_JOB: (id) => `/api/job/${id}`,

    SAVE_JOB: (id) => `/api/save-job/${id}`,
    UNSAVE_JOB: (id) => `/api/save-job/${id}`,
    GET_SAVED_JOBS: "/api/save-job/my",
  },

  APPLICATIONS: {
    APPLY_TO_JOB: (id) => `/api/application/${id}`,             // Jobseeker applies
    GET_ALL_APPLICATIONS: (id) => `/api/application/job/${id}`, // Employer views applications for a job
    UPDATE_STATUS: (id) => `/api/application/${id}/status`,     // Employer updates application status
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
  },
};
