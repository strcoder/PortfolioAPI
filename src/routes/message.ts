import express from 'express';
import passport from 'passport';
import MessageServices from '../services/message';
import cacheResponse from '../utils/cacheResponse';
import validationHandler from '../utils/middleware/validationHandler';
import scopesValidationHandler from '../utils/middleware/scopesValidationHandler';
import { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } from '../utils/time';
import { messageIdScehma, createMessageSchema, updateMessageSchema } from '../utils/schemas/message';
import'../utils/auth/strategies/jwt';

const MessageApi = (app: express.Application) => {
  // const { idSchema, createSchema, updateSchema } = schema;
  // const { getScope, postScope, putScope, deleteScope } = scopes;
  const collection = 'message';
  const router = express.Router();
  const services = new MessageServices(collection);

  app.use('/api/message', router);

  router.get('/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(getScope),

    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      try {
        const [objects, size] = await services.getMessages();
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
    validationHandler({ objectId: messageIdScehma }, 'params'),

    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { objectId } = req.params;
      try {
        const { Message } = await services.getMessage({ objectId });
        if (!Message || Object.entries(Message).length === 0) {
          res.status(404).json({
            data: {},
            message: `${collection} can't recived`,
          });
          return;
        }
        res.status(200).json({
          data: Message,
          message: `${collection} recived`,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post('/',
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(postScope),
    validationHandler(createMessageSchema) ,

    async (req, res, next) => {
      const { body: object } = req;
      try {
        const createdObjectId = await services.createMessage({ object });
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
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(putScope),
    validationHandler({ objectId: messageIdScehma }, 'params'),
    validationHandler(updateMessageSchema),

    async (req, res, next) => {
      const { objectId } = req.params;
      const { body: object } = req;
      try {
        const updateId = await services.updateMessage({ objectId: objectId, object });
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
    // passport.authenticate('jwt', { session: false }),
    // scopesValidationHandler(deleteScope),
    validationHandler({ objectId: messageIdScehma }, 'params'),

    async (req, res, next) => {
      const { objectId } = req.params;

      try {
        const [deletedId, count] = await services.deleteMessage({ objectId });

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

export default MessageApi;
