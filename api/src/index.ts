import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const { Pool } = pg

// routes
import productRoutes from './routes/products/index'

// Use the library in your code
// const pool = new Pool({
//   connectionString:
//     'postgresql://admin:npg_OzFqho0i2sYf@ep-misty-heart-a4dp2rnr-pooler.us-east-1.aws.neon.tech/ecommerce?sslmode=require',
// })

// pool
//   .connect()
//   .then(() => {
//     console.log('✅ Connected to database successfully!')
//     pool.end()
//   })
//   .catch((err) => {
//     console.error('❌ Database connection failed:', err)
//   })

const app = express()
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

// routers
app.use('/products', productRoutes)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
