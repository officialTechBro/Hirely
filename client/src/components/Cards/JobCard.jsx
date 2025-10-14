import { Bookmark, Building, Building2, Calendar, MapPin} from "lucide-react"
import moment from "moment"
import { useAuth } from "../../context/AuthContext"
import StatusBadge from "../Layouts/StatusBadge"



const JobCard = ({job, onClick, onToggleSave, onApply, saved, hideApply}) => {
    const formatSalary = (min, max) => {
            const formatNumber = (num) => {
            if (num >= 1000) return `${(num / 1000).toFixed(0)}k`
            return`$${num}`
        }
    }
  return (
    <div>JobCard</div>
  )
}
export default JobCard