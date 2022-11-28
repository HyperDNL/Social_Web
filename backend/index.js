import app from "./app.js";

// Servidor
app.listen(app.get("port"));
console.log(`Server on port ${app.get("port")}`);
