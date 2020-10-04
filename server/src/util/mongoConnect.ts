import mongoose from 'mongoose'

const MONGODB_URL = process.env.NODE_ENV == "test"
    ? process.env.TEST_DB_URL as string
    : process.env.MONGO_DB_URL as string

mongoose.connect(
    MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false ,
        useCreateIndex: true
    }
).then(() => console.log("mongo started"))
.catch((err) => console.error(err))