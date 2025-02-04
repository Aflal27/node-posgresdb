import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle',
  schema: ['./src/db/productSchema.ts'],
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://admin:npg_OzFqho0i2sYf@ep-misty-heart-a4dp2rnr-pooler.us-east-1.aws.neon.tech/ecommerce?sslmode=require',
  },
  verbose: true,
  strict: true,
})
