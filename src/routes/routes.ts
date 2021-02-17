import AuthApi from './auth';
import { createUserSchema } from './../utils/schemas/user';
import ProjectApi from './project';
import SocialMediaApi from './socialMedia';
import MessageApi from './message';
import MailApi from './mail';

const routes = (app: any) => {
  //** Rutas para el registro y login del usuario **//
  AuthApi(
    app,
    '/api/auth',
    createUserSchema,
  );

  ProjectApi(app);
  SocialMediaApi(app);
  MessageApi(app);
  MailApi(app);
}

export default routes;
