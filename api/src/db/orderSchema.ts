// orders schema
import { createInsertSchema } from 'drizzle-zod'
import {
  doublePrecision,
  integer,
  pgTable,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core'
import { usersTable } from './userSchema'
import { productsTable } from './productSchema'
import { z } from 'zod'

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('New'),
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
  quentity: integer().notNull(),
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
