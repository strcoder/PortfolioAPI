"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var supertest_1 = __importDefault(require("supertest"));
var testServer = function (route) {
    var app = express_1.default();
    route(app);
    return supertest_1.default(app);
};
exports.default = testServer;
