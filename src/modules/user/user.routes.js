import { Router } from 'express';

import * as userController from './user.controller';

const routes = Router();

// routes.post('/login/email', userController.loginWithEmail);
// routes.post('/login/facebook', userController.loginWithFacebook);
// routes.post('/login/google', userController.loginWithGoogle);
// routes.post('/login/phonenumber', userController.loginWithPhoneNumber);

routes.get('/me', userController.authJwt, userController.getUserInfo);

export default routes;
