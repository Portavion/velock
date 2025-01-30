import dotenv from "dotenv";
import passport from "passport";
dotenv.config();
const authenticate = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
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
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
export { authenticate, errorHandler };
