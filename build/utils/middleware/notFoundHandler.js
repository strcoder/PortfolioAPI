"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("@hapi/boom"));
var notFoundHandler = function (req, res) {
    var _a = boom_1.default.notFound().output, statusCode = _a.statusCode, payload = _a.payload;
    res.status(statusCode).json(payload);
};
exports.default = notFoundHandler;
