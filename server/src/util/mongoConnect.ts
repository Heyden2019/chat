import mongoose from 'mongoose'

let MONGODB_URL: string 
switch (process.env.NODE_ENV) {
    case "test": {
        MONGODB_URL = process.env.TEST_DB_URL as string
        break
    }
    case "production": {
        MONGODB_URL = process.env.MONGO_DB_PROD as string
        break
    }
    default: MONGODB_URL = process.env.MONGO_DB_URL as string

}


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