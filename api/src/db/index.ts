import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const pool = new pg.Pool({
  connectionString:
    'postgresql://admin:npg_OzFqho0i2sYf@ep-misty-heart-a4dp2rnr-pooler.us-east-1.aws.neon.tech/ecommerce?sslmode=require',
})

export const db = drizzle(pool)
