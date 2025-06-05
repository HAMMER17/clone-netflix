import jwt from 'jsonwebtoken'

// const JWT_SECRET = process.env.JWT_SECRET
export const genereteTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, 'secret', { expiresIn: '15d' })
  res.cookie('jwt-netflix', token,
    {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true, sameSite: 'strict',
      // secore: 'development'
    })
  return token;
}