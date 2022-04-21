import { Schema, model } from "mongoose";

export interface IReview {
    body: string;
    rating: number;
    author: {
        type: Schema.Types.ObjectId;
        ref: string;
    };
}

const reviewSchema = new Schema<IReview>({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Review = model<IReview>('Review', reviewSchema)
export default Review;
