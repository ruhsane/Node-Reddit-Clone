const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../util/autopopulate");

const PostSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  author: {type: Schema.Types.ObjectId, ref: "User", required: true }

});

// //always populate this author field
// PostSchema
//     .pre('findOne', Populate('author'))
//     .pre('find', Populate('author'))

//Always populate the author field
PostSchema.pre('findOne', Populate('author')).pre('find', Populate('author'))
PostSchema.pre('findOne', Populate('comments')).pre('find', Populate('comments'))

module.exports = mongoose.model("Post", PostSchema);
