"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessageSchema = exports.createMessageSchema = exports.messageIdScehma = void 0;
var joi_1 = __importDefault(require("joi"));
var id_1 = require("./id");
exports.messageIdScehma = id_1.idSchema;
var messageUsernameSchema = joi_1.default.string().max(100);
var messageUserMailSchema = joi_1.default.string().email();
var messageMessageSchema = joi_1.default.string().max(250);
exports.createMessageSchema = {
    username: messageUsernameSchema.required(),
    userMail: messageUserMailSchema.required(),
    message: messageMessageSchema.required(),
};
exports.updateMessageSchema = {
    username: messageUsernameSchema,
    userMail: messageUserMailSchema,
    message: messageMessageSchema,
};
