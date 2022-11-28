import User from "../models/User.js";
import {
  getToken,
  getRefreshToken,
  COOKIE_OPTIONS,
} from "../helpers/authenticate.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, last_name, username, email, password } = req.body;
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      res.json({ message: "The E-Mail is already in use." });
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
