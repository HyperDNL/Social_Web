import express from "express";
import indexRoutes from "./routes/index.routes.js";
import { connectDB } from "./database.js";
import { PORT } from "./config/config.js";

// Inicializaciones
const app = express();
connectDB();

// Configuraciones
app.set("port", PORT);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use(indexRoutes);

export default app;
