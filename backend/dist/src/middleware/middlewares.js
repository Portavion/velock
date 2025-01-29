"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.authenticate = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const authenticate = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.authenticate = authenticate;
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
exports.errorHandler = errorHandler;
