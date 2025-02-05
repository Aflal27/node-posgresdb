import { Request, Response } from 'express'
import { db } from '../../db'
import { productsTable, createProductSchema } from '../../db/productSchema'
import { eq } from 'drizzle-orm'

export const listProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable)
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning()
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getProduct = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)))

    if (!product) {
      res.status(404).json({ error: 'Product not found' })
    } else {
      res.status(200).json(product)
    }
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning()
    if (product) {
      res.send(204)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .update(productsTable)
      .set(req.cleanBody)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning()
    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ error: 'Product not found' })
    }
  } catch (error) {
    res.status(500).json(error)
  } finally {
    res.end()
  }
}
