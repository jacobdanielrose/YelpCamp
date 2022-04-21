import User from '../models/user';
import { Request, Response, NextFunction } from 'express';

export function renderRegister(req: Request, res: Response) {
    res.render('users/register')
}

export async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err: any) => {
            if (err) return next(err)
            req.flash('success', 'Welcome to Yelp Camp!')
            res.redirect('/campgrounds')
        })
    } catch (e: any) {
        req.flash('error', e.message)
        res.redirect('register')
    }
}

export function renderLogin(req: Request, res: Response) {
    res.render('users/login')
}

export function login(req: Request, res: Response) {
    req.flash('success', 'Welcome Back!')
    // use ts ignore here for now, because a dumb type change for session
    // has been implemented for newest @types/express-session version
    //@ts-ignore
    const redirectUrl = req.session.returnTo || '/campgrounds'
    //@ts-ignore
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

export function logout(req: Request, res: Response) {
    req.logout()
    req.flash('success', 'Goodbye!')
    res.redirect('/campgrounds')
}