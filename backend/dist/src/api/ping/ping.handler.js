const pingHandler = {
    getPing: async (_req, res, next) => {
        try {
            res.status(200).json({ msg: "pong" });
            return;
        }
        catch (error) {
            next(error);
        }
    },
};
export default pingHandler;
