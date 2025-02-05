import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from './productController.js'
import { validateData } from '../../middleware/validationMiddleware.js'
import {
  createProductSchema,
  updateProductSchema,
} from '../../db/productSchema.js'

const router = express.Router()

router.get('/', listProducts)
router.post('/', validateData(createProductSchema), createProduct)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', validateData(updateProductSchema), updateProduct)

export default router
