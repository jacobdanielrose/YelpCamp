import passport from 'passport';
import { renderLogin, register, login, logout, renderRegister } from '../controllers/users'
import { Router } from '@awaitjs/express';
const router = Router()


router.get('/register', renderRegister)
router.postAsync('register', register)

router.route('/login')
    .get(renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), login)

router.get('/logout', logout)

export default router;