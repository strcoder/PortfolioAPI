"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
var user_1 = require("./../utils/schemas/user");
var project_1 = __importDefault(require("./project"));
var socialMedia_1 = __importDefault(require("./socialMedia"));
var message_1 = __importDefault(require("./message"));
var mail_1 = __importDefault(require("./mail"));
var routes = function (app) {
    //** Rutas para el registro y login del usuario **//
    auth_1.default(app, '/api/auth', user_1.createUserSchema);
    project_1.default(app);
    socialMedia_1.default(app);
    message_1.default(app);
    mail_1.default(app);
};
exports.default = routes;
