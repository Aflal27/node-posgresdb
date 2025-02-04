import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from './productController'

const router = express.Router()

router.get('/', listProducts)
router.post('/', createProduct)
router.get('/:id', getProduct)
router.delete('/:id', deleteProduct)
router.put('/:id', updateProduct)

export default router
