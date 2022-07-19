import express from 'express'
const router = express.Router()
import {
  getBuy,
  deleteBuy,
  createBuy,
} from '../controllers/buyController.js'
import { createTrans, getTrans, getTransById, getTransToUSer } from '../controllers/transacctionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getTrans).post(createTrans)
router.route('/rut/:id').get(getTransToUSer)
router
  .route('/:id')
  .get(getTransById)
  .delete( deleteBuy)

export default router
