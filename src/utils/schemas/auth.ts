import joi from 'joi';
import { idSchema } from './id';

export const authIdScehma = idSchema;
const authNickNameSchema = joi.string().max(50);
const authEmailSchema = joi.string().email();
const authPasswordSchema = joi.string().min(8).max(50);
const authUserScehma = joi.string();

export const createAuthSchema = {
  email: authEmailSchema.required(),
  nickname: authNickNameSchema.required(),
  password: authPasswordSchema.required(),
  user: authUserScehma.required(),
}

export const updateAuthSchema = {
  email: authEmailSchema,
  nickname: authNickNameSchema,
  password: authPasswordSchema,
  user: authUserScehma,
}
