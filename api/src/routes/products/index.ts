import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProductById,
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
router.get('/:id', getProductById)
router.delete('/:id', deleteProduct)
router.put('/:id', validateData(updateProductSchema), updateProduct)

export default router
