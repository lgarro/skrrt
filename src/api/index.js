/* eslint-disable import/no-extraneous-dependencies,no-console */
import mongoose from 'mongoose'
import BackendServer from './backend.server'

const server = new BackendServer()
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        console.log('Mongo connected')
    } catch (e) {
        console.log('Fatal error connecting Mongo database', e)
    }
}
const init = async () => {
    try {
        await connectDatabase()
        const backendStartupResponse = await server.start()
        console.log(backendStartupResponse)
    } catch (startupError) {
        console.error(startupError)
        console.error('Failed to start API')
    }
}

init()
