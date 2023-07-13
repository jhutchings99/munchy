import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    postedBy: {
      type: Object,
      default: {
        _id: "",
        username: "",
        profileImage: "",
      },
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
