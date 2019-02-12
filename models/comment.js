const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");

const CommentSchema = new Schema({
    content: {type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

//always populate the author field
CommentSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

module.exports = mongoose.model("Comment", CommentSchema);
