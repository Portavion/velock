"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function isUserExist(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        return false;
    }
    else {
        return true;
    }
}
exports.default = isUserExist;
