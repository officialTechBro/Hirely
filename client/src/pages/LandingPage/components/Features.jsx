import { employerFeatures, jobSeekerFeatures } from "../../../utils/data"

const Features = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:5xl font-bold text-gray-900 mb-6">Empowering your success
                    <span className="block bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mt-2">Every step of the way</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Whether you're seeking your next big opportunity or the ideal candidate, our tools and features are designed to help you succeed.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
                {/* Job Seeker */}
                <div>    
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            For Job Seekers
                        </h3>
                        <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-green-600 mx-auto rouded-full" />
                    </div>

                    <div className="space-x-8">
                        {jobSeekerFeatures.map((feature, index) => (
                            <div 
                                key={index}
                                className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-teal-50 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                                    <feature.icon className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employers */}
                <div>
                    <div className="text-center mb-12">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                For Employers
                            </h3>
                            <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rouded-full" />
                        </div>
                    </div>

                    <div className="space-x-8">
                        {employerFeatures.map((feature, index) => (
                            <div 
                                key={index}
                                className="group flex items-start space-x-4 p-6 rounded-2xl hover:bg-amber-50 transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                    <feature.icon className="w-6 h-6 text-amber-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            

            
        </div>


    </section>
  )
}
export default Features