import joi from 'joi';
import { idSchema } from './id';

export const mailIdScehma = idSchema;
const mailUserMailSchema = joi.string().email();

export const createMailSchema = {
  email: mailUserMailSchema.required(),
}

export const updateMailSchema = {
  email: mailUserMailSchema,
}
