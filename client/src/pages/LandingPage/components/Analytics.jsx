// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react'

const Analytics = () => {
  const stats = [
    {
      icon: Users,
      title: 'Active Users',
      value: '2.4M',
      growth: '+15%',
      color: 'teal',
    },
    {
      icon: Briefcase,
      title: 'Jobs Posted',
      value: '152K+',
      growth: '+22%',
      color: 'purple',
    },
    {
      icon: Target,
      title: 'Successful Hires',
      value: '89K+',
      growth: '+18%',
      color: 'amber'
    },
    {
      icon: TrendingUp,
      title: 'Match Rate',
      value: '94%',
      growth: '+8%',
      color: 'cyan'
    },
  ]

  return (
    <section className="py-20 bg-white relative oveerflow-hidden">
        <div className="container mx-auto px-4">
            <motion.div
                 initial={{opacity: 0, y:30}}
                animate={{opacity: 1, y:0}}
                transition={{duration: 0.8}}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Usage 
                    <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent"> Analytics</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Experience the power of real-time insights and intelligent data, showcasing how our platform seamlessly connects talent with opportunity.
                </p>
            </motion.div>

            {/* Stats  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index}
                        initial={{opacity: 0, y:30}}
                        whileInView={{opacity:1, y:0}}
                        transition={{delay: index * 0.1, duration: 0.6}}
                        viewport={{once: true}}
                        className="bg-white p-6 rounded-2xl shadpw-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                            </div>
                            <span className=" text-blue-500 text-sm font-semibold bg-blue-50 px-2 py-1 rounded-full">
                                {stat.growth}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                            <p className="text-gray-600">{stat.title}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Analytics
