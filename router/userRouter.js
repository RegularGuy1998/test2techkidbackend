const express = require("express");
const userRouter = express.Router();
const userModel = require("../model/userModel");

userRouter.post("/", (req, res) => {
    console.log(req.body);
    const { password, fullname } = req.body;
    let { email, username } = req.body;
    let history = {
        sortby: null,
        pagin: 1,
        search: null
    }
    email = email.toLowerCase();
    username = username.toLowerCase();
    userModel.create({ password, username, email, fullname, history }, (err, userCreated) => {
        if (err) {
            console.log(err.errmsg)
            if (err.errmsg.includes(username)) {
                res.send({ success: 0, message: 'username aready have' });
            } else if (err.errmsg.includes(email)) {
                res.send({ success: 0, message: 'email aready have' });
            }
            else {
                res.status(500).send({ success: 0, err });
            }
        } else {
            res.send({ success: 1, userCreated });
        }
    });
});

//Log In
userRouter.put("/", (req, res) => {
    const { username, password } = req.body;
    userModel.findOne({ username, password }, (err, userFound) => {
        if (err) {
            res.status(500).send({ success: 0, err });
        } else if (!userFound) {
            res.send({ success: 0, message: "User not Exist!" })
        } else {
            res.send({ success: 1, userFound });
        }
    });
});

userRouter.put("/:id", (req, res) => {
    console.log('aaaa')
    const { history } = req.body;
    userModel.findById(req.params.id)
        .then(userFound => {
            userFound.history = history;
            return userFound.save();
        })
        .then(userUpdated => {
            res.send({ success: 1, userUpdated });
        })
        .catch(err => res.status(500).send({ success: 0, err }))
});

userRouter.get("/", (req, res) => {
    userModel.find({}, 'username email fullname')
        .then(userList => {
            res.send({ success: 1, userList })
        })
        .catch(err => {
            res.status(500).send({ success: 0, err });
        })
});




module.exports = userRouter;