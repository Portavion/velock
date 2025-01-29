"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const prisma_1 = __importDefault(require("./prisma/prisma"));
const helmet_1 = __importDefault(require("helmet"));
const middlewares_1 = require("./middleware/middlewares");
const cors = require("cors");
const routes_1 = __importDefault(require("./routes"));
const populateBikepoints_1 = require("./prisma/populateBikepoints");
dotenv_1.default.config();
passport_1.default.use(new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || "YOUR_SECRET",
}, async (payload, done) => {
    try {
        const user = await prisma_1.default.user.findUnique({
            where: { id: payload.id },
        });
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }
    catch (error) {
        return done({ error }, false);
    }
}));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, helmet_1.default)({
    crossOriginEmbedderPolicy: false,
}));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
setInterval(populateBikepoints_1.updateBikePointsTable, 1000 * 30);
app.use("/api/v1/", routes_1.default);
app.use(middlewares_1.errorHandler);
app.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
});
