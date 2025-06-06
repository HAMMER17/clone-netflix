
import { fetchTMDB } from "../services/tmdb.service.js"

export async function getTrendingMovie(req, res) {
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`)
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]
    res.json({ success: true, content: randomMovie })
  } catch (error) {
    res.status(500).json({ success: false, message: 'movie controller wrong' })
    console.log(error, 'movie.controller')
  }
}
export async function getTraillersMovie(req, res) {
  const { id } = req.params
  try {                                         //'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US'
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
    res.status(200).json({ success: true, trailers: data.results })
  } catch (error) {
    console.log(error)
  }
}
export async function getDetailsMovie(req, res) {
  const { id } = req.params
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`)
    res.status(200).json({ success: true, content: data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'error getdetailsmovie' })
  }
}
export async function getSimilarMovie(req, res) {
  const { id } = req.params
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`)
    res.status(200).json({ success: true, similar: data.results })
  } catch (error) {
    console.log(error)
  }
}
export async function getCategoryMovie(req, res) {
  const { category } = req.params
  try {
    const data = await fetchTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`)
    res.status(200).json({ success: true, content: data.results })
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: 'error category' })
  }
}