"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMailSchema = exports.createMailSchema = exports.mailIdScehma = void 0;
var joi_1 = __importDefault(require("joi"));
var id_1 = require("./id");
exports.mailIdScehma = id_1.idSchema;
var mailUserMailSchema = joi_1.default.string().email();
exports.createMailSchema = {
    email: mailUserMailSchema.required(),
};
exports.updateMailSchema = {
    email: mailUserMailSchema,
};
