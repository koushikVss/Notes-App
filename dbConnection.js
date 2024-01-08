import mongoose from 'mongoose'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const connectDB = async () => {
    /*
    try {
        const url = process.env.MONGODB_URL
        await mongoose.connect(url)
        console.log("connected to mongo db")
    }
    catch (error) {
        console.log("error ", error.message)
    }*/

    try {

    }
    catch (error) {

    }
}

export default connectDB

