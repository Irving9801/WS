import express from 'express'
const router = express.Router()
import {
  getBuy,
  getBuyById,
  deleteBuy,
  createBuy,
  updateBuy,
} from '../controllers/buyController.js'

router.route('/').get(getBuy).post(createBuy)
router
  .route('/:id')
  .get(getBuyById)
  .delete(deleteBuy)
  .put(updateBuy)

export default router
