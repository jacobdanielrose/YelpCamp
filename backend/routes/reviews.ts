import { validateReview, isLoggedIn, isReviewAuthor } from '../middleware'
import { createReview, deleteReview } from '../controllers/reviews';
import { catchAsync } from '../utils/catchAsync'
import { Router } from '@awaitjs/express';

const router = Router({ mergeParams: true })

router.post('/', isLoggedIn, validateReview, catchAsync(createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(deleteReview))

export default router;