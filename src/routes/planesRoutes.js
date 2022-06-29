import express from "express";
import {
  createPlanes,
  getPlanes,
  getPlanesById,
  deletePlanes,
} from "../controllers/planesController.js";
const router = express.Router();

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getPlanes).post(protect, admin, createPlanes);
// router.route('/:id/reviews').post(protect, createProductReview)
router.route("/:id").get(getPlanesById).delete(protect, admin, deletePlanes);
//   .put(protect, admin, updateProduct)

export default router;
