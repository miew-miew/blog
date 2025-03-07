import mongoose from "mongoose"

const db_URL = process.env.MONGO_URL || "mongodb://localhost:27017/euphorie_no_sekai"

export const connectDB = async() => {
    try {
        await mongoose.connect(db_URL)
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log('Error connecting to DB:', error)
    }
}