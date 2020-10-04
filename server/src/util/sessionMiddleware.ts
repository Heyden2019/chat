import connectMongo from "connect-mongo"
import session from "express-session"
import mongoose from "mongoose"

const MONGODB_URL = process.env.NODE_ENV == "test"
    ? process.env.TEST_DB_URL as string
    : process.env.MONGO_DB_URL as string

const MongoStore = connectMongo(session) 

export const sessionMiddleware = session({
    name: process.env.COOKIE_NAME as string,
    store: new MongoStore({
        url: MONGODB_URL,
        stringify: false,
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        sameSite: "lax"
    },
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: false
})