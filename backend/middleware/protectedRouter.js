import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export async function protectRouter(req, res, next) {
  try {
    const token = req.cookies['jwt-netflix']
    if (!token) {
      return res.status(400).json({ success: false, message: 'token not get' })
    }
    const decoded = jwt.verify(token, 'secret')
    if (!decoded) {
      return res.status(400).json({ success: false, message: 'token not decoded' })
    }
    const user = await User.findById(decoded.userId)
    //.select('-password')
    if (!user) {
      return res.status(400).json({ success: false, message: 'not user' })
    }
    req.user = user;
    next()
  } catch (error) {
    console.log(error)
  }
}