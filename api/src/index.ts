import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()

// routes
import productRoutes from './routes/products/index'
import authRoutes from './routes/auth/index'

const app = express()
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// routers
app.use('/products', productRoutes)
app.use('/auth', authRoutes)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
