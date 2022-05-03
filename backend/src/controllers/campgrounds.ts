import { Request, Response, NextFunction } from "express"
import Campground from '../models/campground'
import { cloudinary } from '../../cloudinary'

//@ts-ignore
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding'
const mapBoxToken = process.env.MAPBOX_TOKEN
console.log(mapBoxToken)
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

export async function index(req: Request, res: Response) {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds })
}

export function renderNewForm(req: Request, res: Response) {
    res.render('campgrounds/new')
}

export async function createCampground(req: Request, res: Response, next: NextFunction) {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send()
    const campground = new Campground(req.body.campground)
    campground.geometry = geoData.body.features[0].geometry
    // need to look at image model probably
    //@ts-ignore
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // need to change the way User is implemented
    // so that this ignore is not necessary
    //@ts-ignore
    campground.author = req.user._id as string;
    await campground.save()
    req.flash('success', 'Successfully made a new Campground!')
    res.redirect(`/campgrounds/${campground._id}`)

}

export async function showCampground(req: Request, res: Response) {
    const campground = await (await Campground.findById(req.params["id"]).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author'))
    if (!campground) {
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground })
}

export async function renderEditForm(req: Request, res: Response) {
    const campground = await Campground.findById(req.params["id"])
    if (!campground) {
        req.flash('error', 'Cannot find that campground!')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })

}

export async function updateCampground(req: Request, res: Response) {
    const { id } = req.params
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground })
    // need to look at image model probably
    //@ts-ignore
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
    if (campground) {
        campground["images"].push(...imgs)
        await campground.save()
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary["uploader"].destroy(filename)
            }
            await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        }
        req.flash('success', 'Successfully updated campground!')
        res.redirect(`/campgrounds/${campground["_id"]}`)
    } else {
        // TODO: implement error for no campgrounds
    }
}

export async function deleteCampground(req: Request, res: Response) {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted campground')
    res.redirect('/campgrounds')
}