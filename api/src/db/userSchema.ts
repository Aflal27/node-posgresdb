// user schema
import { createInsertSchema } from 'drizzle-zod'
import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: text('role').notNull().default('user'),
  address: varchar({ length: 255 }).notNull(),
})

// zod schema
export const createUserSchema = createInsertSchema(usersTable).omit({
  role: true,
  address: true,
})
export const updateUserSchema = createInsertSchema(usersTable).omit({
  role: true,
  address: true,
})

export const loginUserSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
})
