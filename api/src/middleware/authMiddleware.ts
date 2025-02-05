// verify token middleware
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const decoded = verify(token, 'secret')
    console.log(decoded)

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}
