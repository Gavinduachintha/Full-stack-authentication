import express from "express";
import { healthCheck, login,register } from "../controllers/urlControllers.js";

const router = express.Router();

router.get("/", healthCheck);
router.post("/login", login);
router.post("/register",register)

export default router