import express from "express";
const router = express.Router();
import { createUni, getUni } from "../controllers/universityController.js";

router.route("/").get(getUni).post(createUni);

export default router;
