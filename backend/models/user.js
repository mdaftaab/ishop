const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: "String",
            max: 100
        },
        email: {
            type: "String",
            max: 120
        },
        age: {
            type: "String",
            max: 120
        },
        image: {
            type: "String"
        }
    }
)
const User = mongoose.model("User", UserSchema);
module.exports = User;