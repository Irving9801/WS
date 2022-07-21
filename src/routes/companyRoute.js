import express from "express";
import { createCompany, deleteCompany, getCompany } from "../controllers/companyTrans.js";
const router = express.Router();

router.route("/").get(getCompany).post(createCompany);
router
  .route('/:id')
  .delete(deleteCompany)
export default router;
