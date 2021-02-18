import express from 'express';
import passport from 'passport';
import SocialMediaServices from '../services/socialMedia';
import cacheResponse from '../utils/cacheResponse';
import validationHandler from '../utils/middleware/validationHandler';
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler';
import { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } from '../utils/time';
import { socialMediaIdScehma, createSocialMediaSchema, updateSocialMediaSchema } from '../utils/schemas/socialMedia';
import'../utils/auth/strategies/jwt';

const SocialMediaApi = (app: express.Application) => {
  // const { idSchema, createSchema, updateSchema } = schema;
  // const { getScope, postScope, putScope, deleteScope } = scopes;
  const collection = 'social-media';
  const router = express.Router();
  const services = new SocialMediaServices(collection);

  app.use('/api/social-media', router);

  router.get('/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(getScope),

    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      try {
        const [objects, size] = await services.getSocialMedias();
        res.status(200).json({
          data: objects,
          size,
          message: `${collection} listed`
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get('/:objectId',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(getScope),
    validationHandler({ objectId: socialMediaIdScehma }, 'params'),

    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { objectId } = req.params;
      try {
        const { SocialMedia } = await services.getSocialMedia({ objectId });
        if (!SocialMedia || Object.entries(SocialMedia).length === 0) {
          res.status(404).json({
            data: {},
            message: `${collection} can't recived`,
          });
          return;
        }
        res.status(200).json({
          data: SocialMedia,
          message: `${collection} recived`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:social-media']),
    validationHandler(createSocialMediaSchema) ,

    async (req, res, next) => {
      const { body: object } = req;
      try {
        const createdObjectId = await services.createSocialMedia({ object });
        res.status(201).json({
          data: createdObjectId,
          message: `${collection} created`
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put('/:objectId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:social-media']),
    validationHandler({ objectId: socialMediaIdScehma }, 'params'),
    validationHandler(updateSocialMediaSchema),

    async (req, res, next) => {
      const { objectId } = req.params;
      const { body: object } = req;
      try {
        const updateId = await services.updateSocialMedia({ objectId: objectId, object });
        res.status(200).json({
          data: updateId,
          message: `${collection} updated`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete('/:objectId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:social-media']),
    validationHandler({ objectId: socialMediaIdScehma }, 'params'),

    async (req, res, next) => {
      const { objectId } = req.params;

      try {
        const [deletedId, count] = await services.deleteSocialMedia({ objectId });

        if (count === 0) {
          res.status(406).json({
            count,
            data: deletedId,
            message: `${collection} can't deleted`
          });
          return;
        }
        res.status(200).json({
          count,
          data: deletedId,
          message: `${collection} deleted`
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

export default SocialMediaApi;
