import express from 'express'
import { index, createCampground, renderNewForm, updateCampground, showCampground, deleteCampground, renderEditForm } from '../controllers/campgrounds';
import { catchAsync } from '../utils/catchAsync';
import { isLoggedIn, isAuthor, validateCampground } from '../middleware';
import multer from 'multer';
import { storage } from '../../cloudinary';

const upload = multer({ storage })
const router = express.Router()


router.route('/')
.get(catchAsync(index))
.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCampground))

router.get('/new', isLoggedIn, renderNewForm)

router.route('/:id')
.get(catchAsync(showCampground))
.put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCampground))
.delete(isAuthor, isLoggedIn, catchAsync(deleteCampground))


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm))


export default router;