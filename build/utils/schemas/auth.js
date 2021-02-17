"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthSchema = exports.createAuthSchema = exports.authIdScehma = void 0;
var joi_1 = __importDefault(require("joi"));
var id_1 = require("./id");
exports.authIdScehma = id_1.idSchema;
var authNickNameSchema = joi_1.default.string().max(50);
var authEmailSchema = joi_1.default.string().email();
var authPasswordSchema = joi_1.default.string().min(8).max(50);
var authUserScehma = joi_1.default.string();
exports.createAuthSchema = {
    email: authEmailSchema.required(),
    nickname: authNickNameSchema.required(),
    password: authPasswordSchema.required(),
    user: authUserScehma.required(),
};
exports.updateAuthSchema = {
    email: authEmailSchema,
    nickname: authNickNameSchema,
    password: authPasswordSchema,
    user: authUserScehma,
};
