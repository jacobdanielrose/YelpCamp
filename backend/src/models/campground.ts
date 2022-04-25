import { Schema, model } from 'mongoose';
import Review from './review';


// https://res.cloudinary.com/demo/image/upload/w_300,h_200,c_crop/sample.jpg

interface IImage {
    url: string;
    filename: string;
}

const ImageSchema = new Schema<IImage>({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    // TODO: fix this ambiguity properly
    //@ts-ignore
    return this.url.replace('/upload', '/upload/w_200')
})

const opts = { toJSON: { virtuals: true } };

// TODO: define this type more accurately
interface ICampground {
    title: string;
    images: any;
    geometry: any;
    price: number;
    description: string;
    location: string;
    author: any;
    reviews: any;
}

const CampgroundSchema = new Schema<ICampground>({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

// Need to pass virtual properties to connect the 
CampgroundSchema.virtual('properties.title').get(function () {
    // TODO: fix this ambiguity properly
    //@ts-ignore
    return `${this.title}`
})

CampgroundSchema.virtual('properties.id').get(function () {
    // TODO: fix this ambiguity properly
    //@ts-ignore
    return `${this._id}`
})


CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Campground = model<ICampground>('Campground', CampgroundSchema)
export default Campground;