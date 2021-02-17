import joi, { string } from 'joi';
import { idSchema } from './id';

export const projectIdScehma = idSchema;
const projectUrlSchema = joi.string().uri();
const projectTagsSchema = joi.array().items(string());
const projectNameSchema = joi.string();
const projectTextsSchema = joi.array().items(string());
const projectImagesSchema = joi.array().items(string());
const projectGithubSchema = joi.string().uri();
const projectUrlAPISchema = joi.string().uri();
const projectEndDateSchema = joi.string();
const projectStartDateSchema = joi.string();
const projectGithubAPISchema = joi.string().uri();
const projectSocialMediaSchema = joi.array().items(string().uri());
const projectDescriptionSchema = joi.string();

export const createProjectSchema = {
  url: projectUrlSchema,
  tags: projectTagsSchema,
  name: projectNameSchema.required(),
  texts: projectTextsSchema,
  images: projectImagesSchema,
  github: projectGithubSchema,
  urlAPI: projectUrlAPISchema,
  endDate: projectEndDateSchema,
  startDate: projectStartDateSchema.required(),
  githubAPI: projectGithubAPISchema,
  socialMedia: projectSocialMediaSchema,
  description: projectDescriptionSchema.required(),
}

export const updateProjectSchema = {
  url: projectUrlSchema,
  tags: projectTagsSchema,
  name: projectNameSchema.required(),
  texts: projectTextsSchema,
  images: projectImagesSchema,
  github: projectGithubSchema,
  urlAPI: projectUrlAPISchema,
  endDate: projectEndDateSchema,
  startDate: projectStartDateSchema.required(),
  githubAPI: projectGithubAPISchema,
  socialMedia: projectSocialMediaSchema,
  description: projectDescriptionSchema.required(),
}
