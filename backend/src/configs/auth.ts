import passport from 'passport';
import Express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';

import session from 'express-session';
import flash from 'connect-flash';

import User from '../models/user'
import MongoStore from 'connect-mongo';

const dbUrl: string = 'mongodb://localhost:27017/yelpcamp';

export const secret = process.env['SECRET'] as string || 'thisshouldbeabettersecret!';
const storeOptions = {
    mongoUrl: dbUrl,
    //secret: secret,
    touchAfter: 24 * 60 * 60
}

export const store = new MongoStore(storeOptions)
store.on("error", function (e: any) {
    console.log("SESSION STORE ERROR:", e)
})

export default function initAuth(app: Express.Application) {
    const sessionConfig: any = {
        store: store,
        name: 'session',
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            //secure: true,
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }
    app.use(session(sessionConfig))
    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())
    passport.use(new LocalStrategy(User.authenticate()))
    passport.serializeUser(User.serializeUser())
    passport.deserializeUser(User.deserializeUser())
}
