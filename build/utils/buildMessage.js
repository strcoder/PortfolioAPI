"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildMessage = function (entity, action) {
    if (action === 'list') {
        return entity + "s " + action + "ed";
    }
    return entity + " " + action + "d";
};
exports.default = buildMessage;
