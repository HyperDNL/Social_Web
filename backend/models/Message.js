import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema(
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
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Message", messageSchema);
