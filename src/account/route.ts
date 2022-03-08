import { Router } from 'express';

import { signUp } from './controller';

const AuthRoute = Router();

AuthRoute.post('/auth/signup', signUp);

export default AuthRoute;
