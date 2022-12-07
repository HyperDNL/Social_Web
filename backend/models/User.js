import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Message from "./Message.js";

const Session = new mongoose.Schema({
  refreshToken: {
    type: String,
    default: "",
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    profile_picture: {
      url: String,
      public_id: String,
      required: false,
    },
    date_birth: {
      type: Date,
      required: false,
      default: Date.now,
    },
    phone_number: {
      type: Number,
      required: false,
      trim: true,
      default: 0,
    },
    genre: {
      type: String,
      required: false,
      trim: false,
      default: "",
    },
    videogames: {
      type: [String],
      required: false,
      default: [],
    },
    followers: {
      type: [String],
      required: false,
      default: [],
    },
    following: {
      type: [String],
      required: false,
      default: [],
    },
    messages: {
      type: [Message.schema],
      default: [],
    },
    authStrategy: {
      type: String,
      default: "local",
    },
    refreshToken: {
      type: [Session],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.methods = {
  encryptPassword: async (password) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
  },
};

userSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.refreshToken;
    return ret;
  },
});

export default mongoose.model("User", userSchema);
