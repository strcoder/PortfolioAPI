import joi from 'joi';
import { idSchema } from './id';

export const socialMediaIdScehma = idSchema;
const socialPlatziSchema = joi.string().uri();
const socialGithubSchema = joi.string().uri();
const socialTiwtchSchema = joi.string().uri();
const socialTwitterSchema = joi.string().uri();
const socialLinkedinSchema = joi.string().uri();
const socialFacebookSchema = joi.string().uri();
const socialInstagramSchema = joi.string().uri();

export const createSocialMediaSchema = {
  patzi: socialPlatziSchema,
  github: socialGithubSchema,
  twitch: socialTiwtchSchema,
  twitter: socialTwitterSchema,
  linkedin: socialLinkedinSchema,
  facebook: socialFacebookSchema,
  instagram: socialInstagramSchema,
};

export const updateSocialMediaSchema = {
  patzi: socialPlatziSchema,
  github: socialGithubSchema,
  twitch: socialTiwtchSchema,
  twitter: socialTwitterSchema,
  linkedin: socialLinkedinSchema,
  facebook: socialFacebookSchema,
  instagram: socialInstagramSchema,
};
