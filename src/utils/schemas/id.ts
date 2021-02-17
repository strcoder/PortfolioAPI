import joi from 'joi';

export const idSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
