import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import User from "../models/User.js";
import {
  getToken,
  getRefreshToken,
  COOKIE_OPTIONS,
} from "../helpers/authenticate.js";
import { REFRESH_TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import fs from "fs-extra";

export const signup = async (req, res) => {
  try {
    const { name, last_name, username, email, password } = req.body;
    const errors = [];
    const emailUser = await User.findOne({ email: email });
    const usernameVerify = await User.findOne({ username: username });
    if (emailUser) {
      errors.push({ error: "The E-Mail is already in use." });
    }
    if (usernameVerify) {
      errors.push({ error: "The Username is already in use." });
    }
    if (errors.length > 0) {
      res.send(errors);
    } else {
      const newUser = new User({ name, last_name, username, email, password });
      newUser.password = await newUser.encryptPassword(password);
      const token = getToken({ _id: newUser._id });
      const refreshToken = getRefreshToken({ _id: newUser._id });
      newUser.refreshToken.push({ refreshToken });
      await newUser.save();
      res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
      return res.send({ success: true, token });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res, next) => {
  try {
    const token = getToken({ _id: req.user._id });
    const refreshToken = getRefreshToken({ _id: req.user._id });
    User.findById(req.user._id).then(
      (user) => {
        user.refreshToken.push({ refreshToken });
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.send(err);
          } else {
            res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS);
            res.send({ success: true, token });
          }
        });
      },
      (err) => next(err)
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const refreshToken = (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;

  if (refreshToken) {
    try {
      const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const userId = payload._id;
      User.findOne({ _id: userId }).then(
        (user) => {
          if (user) {
            const tokenIndex = user.refreshToken.findIndex(
              (item) => item.refreshToken === refreshToken
            );

            if (tokenIndex === -1) {
              res.statusCode = 401;
              res.send("Unauthorized");
            } else {
              const token = getToken({ _id: userId });
              const newRefreshToken = getRefreshToken({ _id: userId });
              user.refreshToken[tokenIndex] = { refreshToken: newRefreshToken };
              user.save((err, user) => {
                if (err) {
                  res.statusCode = 500;
                  res.send(err);
                } else {
                  res.cookie("refreshToken", newRefreshToken, COOKIE_OPTIONS);
                  res.send({ success: true, token });
                }
              });
            }
          } else {
            res.statusCode = 401;
            res.send("Unauthorized");
          }
        },
        (err) => next(err)
      );
    } catch (err) {
      res.statusCode = 401;
      res.send("Unauthorized");
    }
  } else {
    res.statusCode = 401;
    res.send("Unauthorized");
  }
};

export const profile = (req, res, next) => {
  res.send(req.user);
};

export const updateProfile = async (req, res, next) => {
  try {
    const id = req.user._id;

    if (req.files?.profile_picture) {
      const result = await uploadImage(req.files.profile_picture.tempFilePath);
      await fs.remove(req.files.profile_picture.tempFilePath);
      req.body.profile_picture = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const bodyUpdate = req.body;
    const updatedProfile = await User.findByIdAndUpdate(
      id,
      { $set: bodyUpdate },
      { new: true }
    );
    return res.json(updatedProfile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res, next) => {
  const { signedCookies = {} } = req;
  const { refreshToken } = signedCookies;
  User.findById(req.user._id).then(
    (user) => {
      const tokenIndex = user.refreshToken.findIndex(
        (item) => item.refreshToken === refreshToken
      );

      if (tokenIndex !== -1) {
        user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
      }

      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.send(err);
        } else {
          res.clearCookie("refreshToken");
          res.send({ success: true });
        }
      });
    },
    (err) => next(err)
  );
};
