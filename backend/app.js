import express from "express";
import indexRoutes from "./routes/users.routes.js";
import { connectDB } from "./utils/database.js";
import { COOKIE_SECRET, PORT, WHITELISTED_DOMAINS } from "./config/config.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

// Inicializaciones
const app = express();
connectDB();
import "./config/LocalStrategy.js";
import "./config/JwtStrategy.js";
import "./helpers/authenticate.js";

// Configuraciones
app.set("port", PORT);

const whitelist = WHITELISTED_DOMAINS ? WHITELISTED_DOMAINS.split(",") : [];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },

  credentials: true,
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cookieParser(COOKIE_SECRET));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use(indexRoutes);

export default app;
