const express = require('express');
const bp = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./router/apiRouter');

let backend = express();
const port = 8080;

backend.use(cors());
backend.use(bp.urlencoded({ extended: false }));
backend.use(bp.json());
backend.use("/api", apiRouter);


backend.get("/");

mongoose.connect("mongodb://users:123456abc@ds131902.mlab.com:31902/test2techkid", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Server connect")
    }
})

backend.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server is listening at ${port}`);
    }
})