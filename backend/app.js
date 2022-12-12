import express from "express";
import userRoutes from "./routes/users.routes.js";
import postRoutes from "./routes/posts.routes.js";
import { connectDB } from "./utils/database.js";
import { COOKIE_SECRET, PORT } from "./config/config.js";
import session from "express-session";
import fileUpload from "express-fileupload";
import passport from "passport";
import cookieParser from "cookie-parser";

// Inicializaciones
const app = express();
connectDB();
import "./config/LocalStrategy.js";
import "./config/JwtStrategy.js";
import "./helpers/authenticate.js";

// Configuraciones
app.set("port", PORT);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);
app.use(
  session({
    secret: COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cookieParser(COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
