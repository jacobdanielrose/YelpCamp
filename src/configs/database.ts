import { connect, connection as db } from 'mongoose';
import MongoStore from 'connect-mongo'

const dbUrl: string = 'mongodb://localhost:27017/express-login';

export const secret = process.env.SECRET || 'thisshouldbeabettersecret!';
const storeOptions = {
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
}

export const store = new MongoStore(storeOptions)
store.on("error", function (e: any) {
    console.log("SESSION STORE ERROR:", e)
})


export default function initDB() {
    connect(dbUrl)
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Database connected")
    })
}