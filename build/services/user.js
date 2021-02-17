"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongo_1 = __importDefault(require("../lib/mongo"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserServices = /** @class */ (function () {
    function UserServices(collection) {
        this.collection = collection;
        this.mongoDB = new mongo_1.default();
    }
    UserServices.prototype.getUsers = function (_a) {
        var email = _a.email, nickname = _a.nickname;
        return __awaiter(this, void 0, void 0, function () {
            var query, _b, users, count;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = email && nickname ? { $or: [{ email: email }, { nickname: nickname }] }
                            : email && !nickname ? { email: email }
                                : !email && nickname ? { nickname: nickname }
                                    : {};
                        return [4 /*yield*/, this.mongoDB.getAll(this.collection, query)];
                    case 1:
                        _b = _c.sent(), users = _b[0], count = _b[1];
                        return [2 /*return*/, [users, count] || []];
                }
            });
        });
    };
    UserServices.prototype.getUser = function (_a) {
        var userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.mongoDB.getById(this.collection, userId)];
                    case 1:
                        user = _b.sent();
                        return [2 /*return*/, user || {}];
                }
            });
        });
    };
    UserServices.prototype.getUserDistinct = function (_a) {
        var attribute = _a.attribute;
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.mongoDB.getDistinct(this.collection, attribute)];
                    case 1:
                        list = _b.sent();
                        return [2 /*return*/, list || []];
                }
            });
        });
    };
    UserServices.prototype.createUser = function (_a) {
        var user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var password, hashedPassword, createUserId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        password = user.password;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 1:
                        hashedPassword = _b.sent();
                        user.password = hashedPassword;
                        return [4 /*yield*/, this.mongoDB.create(this.collection, user)];
                    case 2:
                        createUserId = _b.sent();
                        return [2 /*return*/, createUserId];
                }
            });
        });
    };
    UserServices.prototype.updateUser = function (_a) {
        var userId = _a.userId, user = _a.user;
        return __awaiter(this, void 0, void 0, function () {
            var updatedUserId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.mongoDB.update(this.collection, userId, user)];
                    case 1:
                        updatedUserId = _b.sent();
                        return [2 /*return*/, updatedUserId];
                }
            });
        });
    };
    UserServices.prototype.deleteUser = function (_a) {
        var userId = _a.userId;
        return __awaiter(this, void 0, void 0, function () {
            var deletedUserId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.mongoDB.delete(this.collection, userId)];
                    case 1:
                        deletedUserId = _b.sent();
                        return [2 /*return*/, deletedUserId];
                }
            });
        });
    };
    return UserServices;
}());
exports.default = UserServices;
