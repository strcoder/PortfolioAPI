"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var boom_1 = __importDefault(require("@hapi/boom"));
var scopesValidationHandler = function (allowedScopes) {
    return function (req, res, next) {
        if (!req.user && (req.user || !req.user.scopes)) {
            next(boom_1.default.unauthorized('Missing scopes'));
        }
        var hasAccess = allowedScopes.map(function (allowedScopes) { return req.user.scopes.includes(allowedScopes); })
            .find(function (allowed) { return Boolean(allowed); });
        if (hasAccess) {
            next();
        }
        else {
            next(boom_1.default.unauthorized('Insufficients scopes'));
        }
    };
};
exports.default = scopesValidationHandler;
