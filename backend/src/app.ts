/*********************
* EXTENERAL IMPORTS *
*********************/
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoSanitize from 'express-mongo-sanitize';


/********************
 * INTERNAL IMPORTS *
 ********************/

import ExpressError from './utils/ExpressError';

// ROUTES
import userRoutes from './routes/users'
import campgroundRoutes from './routes/campgrounds'
import reviewRoutes from './routes/reviews'

// CONFIGS
import initAuth from './configs/auth'
import initDB from './configs/database';


/**********************
 * APPLICATION CONFIG *
 **********************/
const app: Express = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/*******************
 * DATABASE CONFIG *
 *******************/
initDB();
app.use(mongoSanitize({
    replaceWith: '_',
}))

/***********************
* AUTH/SESSION CONFIG *
***********************/
initAuth(app);

/********************
 * IMPLEMENT ROUTES *
 ********************/

// flash middleware
//app.use((req: Request, res: Response, next: NextFunction) => {
 //   res.locals['currentUser'] = req.user
  //  res.locals['success'] = req.flash('success')
   // res.locals['error'] = req.flash('error')
    //next()
//})

//implement routes
app.use('/user', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

// home route
app.get('/', (req: Request, res: Response) => {
    res.send('hello')
})

// 404 for not-defined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new ExpressError('Page Not Found', 404))
})

// returns server error if something goes r
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('errors', { err })
})

export default app;

// TODO: Need to fix resource policy. Don't know why it isn't working!

// const scriptSrcUrls = [
//     "https://stackpath.bootstrapcdn.com",
//     "https://api.tiles.mapbox.com",
//     "https://api.mapbox.com",
//     "https://kit.fontawesome.com",
//     "https://cdnjs.cloudflare.com",
//     "https://cdn.jsdelivr.net",
// ];
// const styleSrcUrls = [
//     "https://kit-free.fontawesome.com",
//     "https://stackpath.bootstrapcdn.com",
//     "https://api.mapbox.com",
//     "https://api.tiles.mapbox.com",
//     "https://fonts.googleapis.com",
//     "https://use.fontawesome.com",
//     "https://cdn.jsdelivr.net"
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com",
//     "https://*.tiles.mapbox.com",
//     "https://events.mapbox.com",
// ];
// const fontSrcUrls = [];
// app.use(
//     helmet({
//         contentSecurityPolicy: {
//             directives: {
//                 defaultSrc: [],
//                 connectSrc: ["'self'", ...connectSrcUrls],
//                 scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
//                 styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//                 workerSrc: ["'self'", "blob:"],
//                 childSrc: ["blob:"],
//                 objectSrc: [],
//                 imgSrc: [
//                     "'self'",
//                     "blob:",
//                     "data:",
//                     "https://res.cloudinary.com/dxgv3dajj/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
//                     "https://images.unsplash.com",
//                 ],
//                 fontSrc: ["'self'", ...fontSrcUrls],
//             },
//         }
//     })
// )