import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Job from '../models/Job.js'
import Application from '../models/Application.js'
import SavedJob from '../models/SavedJob.js'
import Analytics from '../models/Analytics.js'

const collections = [
    { name: 'Users',        model: User },
    { name: 'Jobs',         model: Job },
    { name: 'Applications', model: Application },
    { name: 'SavedJobs',    model: SavedJob },
    { name: 'Analytics',    model: Analytics },
]

async function clearDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to:', mongoose.connection.host)

    for (const { name, model } of collections) {
        const { deletedCount } = await model.deleteMany({})
        console.log(`  ${name}: deleted ${deletedCount} document(s)`)
    }

    await mongoose.disconnect()
    console.log('Done.')
}

clearDb().catch(err => {
    console.error(err)
    process.exit(1)
})
