const Campground = require('../models/campground')
const Review = require('../models/review')

import express, { Express, Request, Response, NextFunction } from 'express';


export async function createReview(req: Request, res: Response) {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    // need to change the way User is implemented
    // so that this ignore is not necessary
    //@ts-ignore
    review.author = req.user._id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Created new review')
    res.redirect(`/campgrounds/${campground._id}`)
}

export async function deleteReview(req: Request, res: Response) {
    const { id, reviewId } = req.params
    Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)
}