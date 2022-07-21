import express from "express";
const router = express.Router();
import { createUni, deleteUni, getUni } from "../controllers/universityController.js";

router.route("/").get(getUni).post(createUni);
router
  .route('/:id')
  .delete(deleteUni)
export default router;
