import express from 'express'

import * as controller from './auth.controller'

const router = new express.Router()

router.get('/test', controller.test)
// router.post('/signup/email', authController.signUpWithEmail)
// router.post('/login/email', authController.loginWithEmail)
// router.post('/login/facebook', authController.loginWithFacebook)
// router.post('/login/google', authController.loginWithGoogle)
// router.post('/login/phonenumber', authController.loginWithPhoneNumber)

export default router
