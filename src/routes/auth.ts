import express from 'express';
import passport from 'passport';
import boom  from '@hapi/boom';
import jwt from 'jsonwebtoken';
import ApiKeysService from './../services/apiKeys';
import AuthServices from '../services/auth';
import UserServices from '../services/user';
import validationHandler from'./../utils/middleware/validationHandler';
// import { createUserSchema } from'./../utils/schemas/user';
import { config } from'./../config';
import './../utils/auth/strategies/basic'; // Basic strategy

const AuthApi = (app: any, route: string, registerSchema: any) => {
  const router = express.Router();
  app.use(route, router);
  const authService = new AuthServices();
  const apiKeysService = new ApiKeysService();

  router.post('/sign-in', async (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async (error) => {
          if (error) {
            next(error);
          }
          const { _id: id, nickname, email, user: key } = user;

          const apiKey = await apiKeysService.getApiKey({ token: config.registerApiKeysToken });
          if (!apiKey) {
            next(boom.unauthorized());
          }
          const payload = {
            sub: id,
            email,
            nickname,
            scopes: apiKey.scopes,
          }
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '60m'
          });
          return res.status(200).json({
            token,
            user: { id: key, nickname, email }
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  router.post(`/sign-up`, validationHandler(registerSchema), async (req, res, next) => {
    const { body: user } = req;
    const userService = new UserServices('users');
    try {
      const emailDistinct = await authService.getAuthDistinct({ attribute: 'email' });
      const nicknameDistinct = await authService.getAuthDistinct({ attribute: 'nickname' });
      const listEmail = emailDistinct.map((d: string) => d.toLowerCase());
      const listNickname = nicknameDistinct.map((d: string) => d.toLowerCase());
      console.log(emailDistinct);
      console.log(nicknameDistinct);
      if (listEmail.includes(user.email.toLowerCase()) || listNickname.includes(user.nickname.toLowerCase())) {
        res.status(409).json({
          data: [],
          message: 'User already exists'
        });
        return;
      } else {
        const auth = {
          email: user.email,
          nickname: user.nickname,
          password: user.password,
          user: '',
        }
        const createUserId = await userService.createUser({ user });
        auth.user = createUserId;
        await authService.createAuth({ auth });
        res.status(201).json({
          data: createUserId,
          message: 'User created',
        });
      }
    } catch (error) {
      next(error);
    }
  });

  router.post(`/validate-user`, async (req, res, next) => {
    const { body: user } = req;
    try {
      const userExist = await authService.getAuth({ email: user.email, nickname: user.nickname });
      if (userExist) {
        res.status(409).json({
          data: {},
          message: 'User already exists'
        });
      } else {
        res.status(200).json({
          data: {},
          message: `User can register`,
        });
      }
    } catch (error) {
      next(error);
    }
  });
}

export default AuthApi;