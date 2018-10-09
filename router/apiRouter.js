const express =  require("express");
const apiRouter = express.Router();
const userRouter = require("./userRouter");


apiRouter.use("/", (req, res, next) => {
    console.log("Api Router");
    next();
})

apiRouter.use("/user", userRouter);

module.exports = apiRouter;