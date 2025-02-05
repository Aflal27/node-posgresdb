// orders schema
import { createInsertSchema } from 'drizzle-zod'
import { doublePrecision, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { usersTable } from './userSchema.js'
import { productsTable } from './productSchema.js'
import { z } from 'zod/index.js'

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
})

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
})

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true,
  status: true,
  createdAt: true,
})

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  orderId: true,
})

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderSchema),
})

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
  status: true,
})
