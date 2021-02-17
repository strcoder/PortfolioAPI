"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = require("./config/index");
var routes_1 = __importDefault(require("./routes/routes"));
var app = express_1.default();
app.use(express_1.default.json());
routes_1.default(app);
app.listen(index_1.config.port, function () {
    console.log("\nListening http://localhost:" + index_1.config.port + "\n");
});
