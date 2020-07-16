const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: Number,
    user_name: String,
    password: String,
    create_time: String,
    is_admin: Boolean
})

userSchema.index({id: 1});

const UsersModel = mongoose.model('users', userSchema);

module.exports = UsersModel