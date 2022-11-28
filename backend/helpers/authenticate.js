import passport from "passport";
import jwt from "jsonwebtoken";
import {
  REFRESH_TOKEN_EXPIRY,
  JWT_SECRET,
  SESSION_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../config/config.js";

const dev = process.env.NODE_ENV !== "production";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
};

export const getToken = (user) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: eval(SESSION_EXPIRY),
  });
};

export const getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: eval(REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};

export const verifyUser = passport.authenticate("jwt", { session: false });
