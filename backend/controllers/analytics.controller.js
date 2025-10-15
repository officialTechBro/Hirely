import Job from "../models/Job.js";
import Application from "../models/Application.js";

const getTrend = (current, previous) => {
  // If both are 0, no change
  if (current === 0 && previous === 0) return 0;
  
  // If previous is 0 but current > 0, that's 100% increase
  if (previous === 0 && current > 0) return 100;
  
  // If current is 0 but previous > 0, that's 100% decrease
  if (current === 0 && previous > 0) return -100;
  
  // Normal percentage calculation
  return Math.round(((current - previous) / previous) * 100);
};

export const getEmployerAnalytics = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const companyId = req.user._id;

    const now = new Date();
    const last7Days = new Date(now);       // [last7Days, now)
    last7Days.setDate(now.getDate() - 7);
    const prev7Days = new Date(last7Days); // [prev7Days, last7Days)
    prev7Days.setDate(last7Days.getDate() - 7);

    // Get employer job ids (lean for perf)
    const jobs = await Job.find({ company: companyId }).select("_id").lean();
    const jobIds = jobs.map(j => j._id);

    // If no jobs, short-circuit with zeros
    if (jobIds.length === 0) {
      return res.status(200).json({
        counts: {
          totalActiveJobs: 0,
          totalApplication: 0,
          totalHired: 0,
          trends: { activeJob: 0, totalApplicants: 0, totalHired: 0 }
        },
        data: { recentJobs: [], recentApplications: [] }
      });
    }

    // Parallel counts
    const [
      totalActiveJobs,
      totalApplications,
      totalHired,

      // Trends: Active jobs created in windows
      activeJobsLast7,
      activeJobsPrev7,

      // Trends: Applications created in windows
      applicationsLast7,
      applicationsPrev7,

      // Trends: Hires created in windows
      hiredLast7,
      hiredPrev7,

      recentJobs,
      recentApplications
    ] = await Promise.all([
      Job.countDocuments({ company: companyId, isClosed: false }),
      Application.countDocuments({ job: { $in: jobIds } }),
      // Ensure status casing matches your schema. If your stored value is "accepted", change it here.
      Application.countDocuments({ job: { $in: jobIds }, status: "Accepted" }),

      Job.countDocuments({
        company: companyId,
        createdAt: { $gte: last7Days, $lt: now } // [last7Days, now)
      }),
      Job.countDocuments({
        company: companyId,
        createdAt: { $gte: prev7Days, $lt: last7Days } // [prev7Days, last7Days)
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        createdAt: { $gte: last7Days, $lt: now }
      }),
      Application.countDocuments({
        job: { $in: jobIds },
        createdAt: { $gte: prev7Days, $lt: last7Days }
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "Accepted",
        createdAt: { $gte: last7Days, $lt: now }
      }),
      Application.countDocuments({
        job: { $in: jobIds },
        status: "Accepted",
        createdAt: { $gte: prev7Days, $lt: last7Days }
      }),

      Job.find({ company: companyId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title location type createdAt isClosed"),

      Application.find({ job: { $in: jobIds } })
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("applicant", "name email avatar")
        .populate("job", "title")
    ]);

    const activeJobTrend = getTrend(activeJobsLast7, activeJobsPrev7);
    const applicationTrend = getTrend(applicationsLast7, applicationsPrev7);
    const hiredTrend = getTrend(hiredLast7, hiredPrev7);

    return res.status(200).json({
      counts: {
        totalActiveJobs,
        totalApplications,  
        totalHired,
        trends: {
          activeJobs: activeJobTrend,   
          applications: applicationTrend,
          hired: hiredTrend             
        }
      },
      data: {
        recentJobs,
        recentApplications
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to get analytics", error: error.message });
  }
};
