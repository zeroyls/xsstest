const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    user_name: String,
    id: Number,
    create_time: String,
    content: String
})

commentsSchema.index({id: 1});


const CommentModel = mongoose.model('comments', commentsSchema)

module.exports = CommentModel;