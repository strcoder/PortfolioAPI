import joi from 'joi';
import { idSchema } from './id';

export const userIdScehma = idSchema;
const userNameSchema = joi.string().max(50);
const userLastNameSchema = joi.string().max(100);
const userNickNameSchema = joi.string().max(50);
const userEmailSchema = joi.string().email();
const userPasswordSchema = joi.string().min(8).max(50);
const userThemeSchema = joi.string();

export const createUserSchema = {
  name: userNameSchema.required(),
  email: userEmailSchema.required(),
  theme: userThemeSchema,
  lastname: userLastNameSchema.required(),
  nickname: userNickNameSchema.required(),
  password: userPasswordSchema.required(),
}

export const updateUserSchema = {
  name: userNameSchema,
  email: userEmailSchema,
  theme: userThemeSchema,
  lastname: userLastNameSchema,
  nickname: userNickNameSchema,
  password: userPasswordSchema,
}
