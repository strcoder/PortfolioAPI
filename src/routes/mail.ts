import express from 'express';
import passport from 'passport';
import MailServices from '../services/mail';
import cacheResponse from '../utils/cacheResponse';
import validationHandler from '../utils/middleware/validationHandler';
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler';
import { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } from '../utils/time';
import { mailIdScehma, createMailSchema, updateMailSchema } from '../utils/schemas/mail';
import'../utils/auth/strategies/jwt';

const MailApi = (app: express.Application) => {
  // const { idSchema, createSchema, updateSchema } = schema;
  // const { getScope, postScope, putScope, deleteScope } = scopes;
  const collection = 'mail';
  const router = express.Router();
  const services = new MailServices(collection);

  app.use('/api/Mail', router);

  router.get('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:mail']),

    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      try {
        const [objects, size] = await services.getMails();
        res.status(200).json({
          data: objects,
          size,
          Mail: `${collection} listed`
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get('/:objectId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:mail']),
    validationHandler({ objectId: mailIdScehma }, 'params'),

    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { objectId } = req.params;
      try {
        const { Mail } = await services.getMail({ objectId });
        if (!Mail || Object.entries(Mail).length === 0) {
          res.status(404).json({
            data: {},
            Mail: `${collection} can't recived`,
          });
          return;
        }
        res.status(200).json({
          data: Mail,
          Mail: `${collection} recived`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(postScope),
    validationHandler(createMailSchema) ,

    async (req, res, next) => {
      const { body: object } = req;
      try {
        const createdObjectId = await services.createMail({ object });
        res.status(201).json({
          data: createdObjectId,
          Mail: `${collection} created`
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put('/:objectId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['edit:mail']),
    validationHandler({ objectId: mailIdScehma }, 'params'),
    validationHandler(updateMailSchema),

    async (req, res, next) => {
      const { objectId } = req.params;
      const { body: object } = req;
      try {
        const updateId = await services.updateMail({ objectId: objectId, object });
        res.status(200).json({
          data: updateId,
          Mail: `${collection} updated`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete('/:objectId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:mail']),
    validationHandler({ objectId: mailIdScehma }, 'params'),

    async (req, res, next) => {
      const { objectId } = req.params;

      try {
        const [deletedId, count] = await services.deleteMail({ objectId });

        if (count === 0) {
          res.status(406).json({
            count,
            data: deletedId,
            Mail: `${collection} can't deleted`
          });
          return;
        }
        res.status(200).json({
          count,
          data: deletedId,
          Mail: `${collection} deleted`
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

export default MailApi;
