import { Request, Response, NextFunction } from 'express';
import { campgroundSchema, reviewSchema } from './schemas';
import ExpressError from './utils/ExpressError'
import Campground from './models/campground'
import Review from './models/review'

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
        // use ts ignore here for now, because a dumb type change for session
        // has been implemented for newest @types/express-session version
        //@ts-ignore
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in')
        return res.redirect('/login')
    }
    next()
}

export function validateCampground(req: Request, res: Response, next: NextFunction) {
    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map((el: { message: any; }) => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    next()
}

export async function isAuthor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const campground = await Campground.findById(id)
    // need to look at image model probably
    //@ts-ignore
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

export function validateReview(req: Request, res: Response, next: NextFunction) {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map((el: { message: any; }) => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    next()
}

export async function isReviewAuthor(req: Request, res: Response, next: NextFunction) {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    // need to look at image model probably
    //@ts-ignore
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}