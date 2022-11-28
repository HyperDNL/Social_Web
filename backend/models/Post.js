import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);
