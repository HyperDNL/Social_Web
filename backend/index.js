import app from "./app.js";

// Servidor
app.listen(app.get("port"));
console.log(`server on port ${app.get("port")}`);
