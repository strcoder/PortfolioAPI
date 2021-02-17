"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("@hapi/boom"));
var joi_1 = __importDefault(require("joi"));
var validate = function (data, schema) {
    var error = joi_1.default.object(schema).validate(data).error;
    return error;
};
var validationHandler = function (schema, check) {
    if (check === void 0) { check = "body"; }
    return function (req, res, next) {
        var error = validate(req[check], schema);
        error ? next(boom_1.default.badRequest(error.message)) : next();
    };
};
exports.default = validationHandler;
