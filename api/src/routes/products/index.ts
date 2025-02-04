import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('products')
})

export default router
