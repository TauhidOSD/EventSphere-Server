const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      profile_picture: { type: String, required: true },
    },
    text: { type: String, required: true },
    reactions: {
      like: { type: Number },
      love: { type: Number }
    }
  },
  { timestamps: true }  // This adds createdAt and updatedAt to comments
);

const postSchema = new mongoose.Schema(
  {
    user: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      profile_picture: { type: String, required: true },
    },
    content: {
      text: { type: String, required: true },
      media: [
        {
          url: { type: String, required: true },
        }
      ]
    },
    reactions: {
      like: { type: Number },
      love: { type: Number },
    },
    comments: [commentSchema]  // Embedding the commentSchema here
  },
  { timestamps: true }  // This adds createdAt and updatedAt to posts
);

const Posts = mongoose.model("Posts", postSchema);

module.exports = Posts;
