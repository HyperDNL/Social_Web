import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

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
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dh9ph7mpz/image/upload/v1670761199/uploads_webapp/profile_picture_template_tras7r.jpg",
      },
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
      type: [
        {
          user: {
            type: Schema.ObjectId,
          },
        },
      ],
      required: false,
      default: [],
    },
    following: {
      type: [
        {
          user: {
            type: Schema.ObjectId,
          },
        },
      ],
      required: false,
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
