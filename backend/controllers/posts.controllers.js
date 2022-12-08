import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import User from "../models/User.js";
import Post from "../models/Post.js";
import fs from "fs-extra";

export const allPosts = (req, res) => {
  res.send("hello world");
};

export const userPosts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const posts = await Post.find({ user_id: user_id }).sort({ date: "desc" });
    return res.send(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req, res, next) => {
  try {
    const user_id = req.user._id;
    const username = req.user.username;
    const { text } = req.body;
    let image = null;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }
    const newPost = new Post({ user_id, username, text, image });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    if (post && post.image.public_id) {
      await deleteImage(post.image.public_id);
    }

    if (!post) return res.sendStatus(404);

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
