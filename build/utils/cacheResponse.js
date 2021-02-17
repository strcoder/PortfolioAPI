"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./../config");
var cacheResponse = function (res, seconds) {
    if (!config_1.config.dev) {
        res.set('Cache-Control', "public, max-age=" + seconds);
    }
};
exports.default = cacheResponse;
