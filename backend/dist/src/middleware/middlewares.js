import dotenv from "dotenv";
import passport from "passport";
dotenv.config();
const authenticate = (req, res, next) => {
    console.log("authorisation check");
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            res.status(401);
            return next(err);
        }
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
    return;
};
export { authenticate, errorHandler };
