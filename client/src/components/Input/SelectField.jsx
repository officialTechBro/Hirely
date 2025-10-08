

const SelectField = ({label, id, value, onChange, options, placeholder, error, required=false, disabled=false, icon:Icon}) => {
  return <div className="space-y-2">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
            {Icon && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Icon className="h-5 w-5 text-gray-400" />
                </div>
            )}

            <select 
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full ${
                    Icon ? "pl-10" : "pl-3"
                } pr-3 py-2.5 border rounded-lg text-base transition-colors duration-200 disabled:bg-gray-50 disabled:text-gray-500 ${
                    error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : 
                    "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                } focus:oultine-nonr focus:ring-2 focus:ring-opacity-20 ap bg-white`}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-centerpr-2 pointer-events-none">
                <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="MS.293 7.292a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 1 0 01-1.414 0l-4-4al 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {error && (
                <div className="flex items-center space-x-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    </div>
}
export default SelectField