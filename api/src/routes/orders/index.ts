// create routes
import express from 'express'
import {
  createOrder,
  getOrder,
  listOrders,
  updateOrder,
} from './orderController.js'
import { validateData } from '../../middleware/validationMiddleware.js'
import {
  insertOrderSchema,
  insertOrderItemSchema,
  updateOrderSchema,
  insertOrderWithItemsSchema,
} from '../../db/orderSchema.js'
import { verifyToken } from '../../middleware/authMiddleware.js'

const router = express.Router()

router.post(
  '/',
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
)
router.get('/', verifyToken, listOrders)
router.get('/:id', verifyToken, getOrder)
router.put('/:id', verifyToken, validateData(updateOrderSchema), updateOrder)

export default router
