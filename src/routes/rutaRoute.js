import express from "express";
const router = express.Router();
import { createRuta, getRuta } from "../controllers/rutaController.js";

router.route("/").get(getRuta).post(createRuta);

export default router;
