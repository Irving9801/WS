import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import planesRoutes from "./src/routes/planesRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import buyRoutes from "./src/routes/buyRoutes.js";
import transRoutes from "./src/routes/transRoutes.js";
import rutaRoutes from "./src/routes/rutaRoute.js";
import universityRoutes from "./src/routes/universityRoutes.js";
import companyRoutes from "./src/routes/companyRoute.js";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import bodyParser from "body-parser";

dotenv.config();

connectDB();
//settings
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser({ limit: "5mb" }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/planes", planesRoutes);
app.use("/api/buy", buyRoutes);
app.use("/api/trans", transRoutes);
app.use("/api/university", universityRoutes);
app.use("/api/ruta", rutaRoutes);
app.use("/api/company", companyRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

// mongoose connection
app.use(notFound);
app.use(errorHandler);
// server listening
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
