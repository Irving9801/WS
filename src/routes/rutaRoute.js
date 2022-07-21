import express from "express";
const router = express.Router();
import { createRuta, deleteRuta, getRuta } from "../controllers/rutaController.js";

router.route("/").get(getRuta).post(createRuta);
router
  .route('/:id')
  .delete(deleteRuta)
export default router;
// router