import mongoose from 'mongoose'

let MONGODB_URL: string 
console.log("*****************************************************")
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
console.log("*****************************************************")
switch (process.env.NODE_ENV) {
    case "test": {
        MONGODB_URL = process.env.TEST_DB_URL as string
        console.log('1', 1)
        break;
    }
    case "production": {
        MONGODB_URL = process.env.MONGO_DB_PROD as string
        console.log('2', 2)
        break;
    }
    default: {
        MONGODB_URL = process.env.MONGO_DB_URL as string
        console.log('3', 3)
    }

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