import passport from 'passport';
import Express from 'express'
import { Strategy as LocalStrategy } from 'passport-local';


import session from 'express-session';
import flash from 'connect-flash';

import { store, secret } from './database'

import User from '../models/user'

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
