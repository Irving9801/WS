import express from "express";
import { createCompany, getCompany } from "../controllers/companyTrans.js";
const router = express.Router();

router.route("/").get(getCompany).post(createCompany);

export default router;
