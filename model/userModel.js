const mongosee = require("mongoose");
const Schema = mongosee.Schema;

const historySchema = new Schema ({
    sortby: {type: String},
    pagin: {type: String},
    search: {type: String}

})

const userSchema = new Schema ({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true },
    username: {type: String, require: true, unique: true},
    fullname: {type: String, require: true },
    history: {type: historySchema}
}, {
    timestamps: true
});

module.exports = mongosee.model("User", userSchema);