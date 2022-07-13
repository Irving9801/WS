import express from 'express'
const router = express.Router()
import {
  getBuy,
  getBuyById,
  deleteBuy,
  createBuy,
} from '../controllers/buyController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBuy).post(protect, admin, createBuy)
router
  .route('/:id')
  .get(getBuyById)
  .delete(protect, admin, deleteBuy)

export default router