import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
    likes: {
      type: Array,
      default: [],
    },
    totalLikes: {
      type: Number,
      default: 0,
    },
    replies: {
      type: mongoose.Schema.Types.Mixed,
      default: [],
    },
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", ReplySchema);
export default Reply;
