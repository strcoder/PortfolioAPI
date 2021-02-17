"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = exports.projectIdScehma = void 0;
var joi_1 = __importStar(require("joi"));
var id_1 = require("./id");
exports.projectIdScehma = id_1.idSchema;
var projectUrlSchema = joi_1.default.string().uri();
var projectTagsSchema = joi_1.default.array().items(joi_1.string());
var projectNameSchema = joi_1.default.string();
var projectTextsSchema = joi_1.default.array().items(joi_1.string());
var projectImagesSchema = joi_1.default.array().items(joi_1.string());
var projectGithubSchema = joi_1.default.string().uri();
var projectUrlAPISchema = joi_1.default.string().uri();
var projectEndDateSchema = joi_1.default.string();
var projectStartDateSchema = joi_1.default.string();
var projectGithubAPISchema = joi_1.default.string().uri();
var projectSocialMediaSchema = joi_1.default.array().items(joi_1.string().uri());
var projectDescriptionSchema = joi_1.default.string();
exports.createProjectSchema = {
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
};
exports.updateProjectSchema = {
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
};
