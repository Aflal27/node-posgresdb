import express, { urlencoded } from 'express'
import serverless from 'serverless-http'
import dotenv from 'dotenv'
dotenv.config()

// routes
import productRoutes from './routes/products/index.js'
import authRoutes from './routes/auth/index.js'

const app = express()
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// routers
app.use('/products', productRoutes)
app.use('/auth', authRoutes)

if (process.env.NODE_ENV === 'dev') {
  app.listen(3000, () => {
    console.log('Server started on port 3000')
  })
}

export const handler = serverless(app)
