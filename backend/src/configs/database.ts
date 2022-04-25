import { connect, connection as db } from 'mongoose';

const dbUrl: string = 'mongodb://localhost:27017/yelpcamp';

export default function initDB() {
    connect(dbUrl)
    db.on("error", console.error.bind(console, "connection error:"))
    db.once("open", () => {
        console.log("Database connected")
    })
}