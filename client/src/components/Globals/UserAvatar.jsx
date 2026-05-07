import { useState } from "react"
import { getInitials } from "../../utils/helper"

const UserAvatar = ({ src, name = "", className = "h-10 w-10", textClassName = "text-sm" }) => {
  const [error, setError] = useState(false)

  if (src && !error) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setError(true)}
        className={`${className} rounded-full object-cover`}
      />
    )
  }

  return (
    <div className={`${className} rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0`}>
      <span className={`text-teal-600 font-semibold ${textClassName}`}>
        {getInitials(name)}
      </span>
    </div>
  )
}

export default UserAvatar
