"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma/prisma"));
async function isUserExist(userId) {
    const user = await prisma_1.default.user.findUnique({ where: { id: userId } });
    if (!user) {
        return false;
    }
    else {
        return true;
    }
}
exports.default = isUserExist;
