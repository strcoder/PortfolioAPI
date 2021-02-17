"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.userIdScehma = void 0;
var joi_1 = __importDefault(require("joi"));
var id_1 = require("./id");
exports.userIdScehma = id_1.idSchema;
var userNameSchema = joi_1.default.string().max(50);
var userLastNameSchema = joi_1.default.string().max(100);
var userNickNameSchema = joi_1.default.string().max(50);
var userEmailSchema = joi_1.default.string().email();
var userPasswordSchema = joi_1.default.string().min(8).max(50);
var userThemeSchema = joi_1.default.string();
exports.createUserSchema = {
    name: userNameSchema.required(),
    email: userEmailSchema.required(),
    theme: userThemeSchema,
    lastname: userLastNameSchema.required(),
    nickname: userNickNameSchema.required(),
    password: userPasswordSchema.required(),
};
exports.updateUserSchema = {
    name: userNameSchema,
    email: userEmailSchema,
    theme: userThemeSchema,
    lastname: userLastNameSchema,
    nickname: userNickNameSchema,
    password: userPasswordSchema,
};
