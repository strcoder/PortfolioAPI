"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSocialMediaSchema = exports.createSocialMediaSchema = exports.socialMediaIdScehma = void 0;
var joi_1 = __importDefault(require("joi"));
var id_1 = require("./id");
exports.socialMediaIdScehma = id_1.idSchema;
var socialPlatziSchema = joi_1.default.string().uri();
var socialGithubSchema = joi_1.default.string().uri();
var socialTiwtchSchema = joi_1.default.string().uri();
var socialTwitterSchema = joi_1.default.string().uri();
var socialLinkedinSchema = joi_1.default.string().uri();
var socialFacebookSchema = joi_1.default.string().uri();
var socialInstagramSchema = joi_1.default.string().uri();
exports.createSocialMediaSchema = {
    patzi: socialPlatziSchema,
    github: socialGithubSchema,
    twitch: socialTiwtchSchema,
    twitter: socialTwitterSchema,
    linkedin: socialLinkedinSchema,
    facebook: socialFacebookSchema,
    instagram: socialInstagramSchema,
};
exports.updateSocialMediaSchema = {
    patzi: socialPlatziSchema,
    github: socialGithubSchema,
    twitch: socialTiwtchSchema,
    twitter: socialTwitterSchema,
    linkedin: socialLinkedinSchema,
    facebook: socialFacebookSchema,
    instagram: socialInstagramSchema,
};
