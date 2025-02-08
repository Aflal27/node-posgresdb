import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')

  if (!token) {
    res.status(401).json({ error: 'Access denied' })
    return
  }

  try {
    // decode jwt toke data
    const decoded = jwt.verify(token, 'secret')

    if (typeof decoded !== 'object' || !decoded?.id) {
      res.status(401).json({ error: 'Access denied' })
      return
    }

    // @ts-ignore
    req.userId = decoded.id

    // @ts-ignore
    req.role = decoded.role

    next()
  } catch (e) {
    res.status(401).json({ error: 'Access denied' })
  }
}
