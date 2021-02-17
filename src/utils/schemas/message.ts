import joi from 'joi';
import { idSchema } from './id';

export const messageIdScehma = idSchema;
const messageUsernameSchema = joi.string().max(100);
const messageUserMailSchema = joi.string().email();
const messageMessageSchema = joi.string().max(250);

export const createMessageSchema = {
  username: messageUsernameSchema.required(),
  userMail: messageUserMailSchema.required(),
  message: messageMessageSchema.required(),
}

export const updateMessageSchema = {
  username: messageUsernameSchema,
  userMail: messageUserMailSchema,
  message: messageMessageSchema,
}
