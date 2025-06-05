import express from 'express'
import path from "path";
import authRouter from './router/auth.route.js'
import movieRouter from './router/movie.route.js'
import tvRouter from './router/tv.route.js'
import searchRouter from './router/search.route.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
import { protectRouter } from './middleware/protectedRouter.js'

dotenv.config()
const app = express()
const __dirname = path.resolve();
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/movie', protectRouter, movieRouter)
app.use('/api/v1/tv', protectRouter, tvRouter)
app.use('/api/v1/search', protectRouter, searchRouter)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
// console.log(process.env.NODE_ENV)
app.listen(5000, () => {
  connectDB()
  console.log('server worked at http://localhost:5000/')
})
