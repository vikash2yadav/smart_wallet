module.exports = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to smart wallet");
    });

    // User routes
    app.use("/user", require("./users"));
};
