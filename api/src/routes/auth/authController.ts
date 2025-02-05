import { Request, Response } from 'express'
import { usersTable } from '../../db/userSchema'
import { db } from '../../db'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//  register user with bcrypt

export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.cleanBody
    data.password = await bcrypt.hash(req.body.password, 10)
    const [user] = await db.insert(usersTable).values(data).returning()

    // @ts-ignore
    delete user.password

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

// login user with jwt
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.cleanBody
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))

    // create a jwt token

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      'secret',
      { expiresIn: '30d' }
    )

    if (!user) {
      res.status(404).json({ error: 'User not found' })
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (isPasswordValid) {
        // @ts-ignore
        delete user.password
        res.status(200).json({ user, token })
      } else {
        res.status(401).json({ error: 'Invalid credentials' })
      }
    }
  } catch (error) {
    res.status(500).json(error)
  }
}
