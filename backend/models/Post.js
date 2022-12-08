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
    text: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      url: String,
      public_id: String,
      required: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    dislikes: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);
