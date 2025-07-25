import express from "express";
import router from "./routes/urlRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    credentials: true,
  })
);

app.use("/", router);

export default app;
