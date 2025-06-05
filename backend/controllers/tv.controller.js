
import { fetchTMDB } from "../services/tmdb.service.js"

export async function getTrendingTv(req, res) {
  try {
    const data = await fetchTMDB('https://api.themoviedb.org/3/trending/tv/day?language=en-US')
    const randomTv = data.results[Math.floor(Math.random() * data.results?.length)]
    res.json({ success: true, content: randomTv })
  } catch (error) {
    res.status(500).json({ success: false, message: 'tv controller wrong' })
    console.log(error, 'tv.controller')
  }
}
export async function getTraillersTv(req, res) {
  const { id } = req.params
  try {                                         //'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US'
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
    res.status(200).json({ success: true, trailers: data.results })
  } catch (error) {
    console.log(error)
  }
}
export async function getDetailsTv(req, res) {
  const { id } = req.params
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
    res.status(200).json({ success: true, content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'error getdetailstv' })
  }
}
export async function getSimilarTv(req, res) {
  const { id } = req.params
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, similar: data.results })
  } catch (error) {
    console.log(error)
  }
}
export async function getCategoryTv(req, res) {
  const { category } = req.params
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: 'error category tv' })
  }
}