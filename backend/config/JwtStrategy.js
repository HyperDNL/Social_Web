import passport from "passport";
import jwt from "passport-jwt";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/config.js";

const jwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const options = {};

options.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = JWT_SECRET;

passport.use(
  new jwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
