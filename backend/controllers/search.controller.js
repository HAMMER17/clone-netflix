import { User } from "../models/user.model.js"
import { fetchTMDB } from "../services/tmdb.service.js"

export const searchPerson = async (req, res) => {
  const { query } = req.params
  try {
    const responce = await fetchTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
    if (responce.results.length === 0) {
      return res.status(401).json({ success: false, message: 'person null' })
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: responce.results[0].id,
          image: responce.results[0].profile_path,
          title: responce.results[0].name,
          searchType: 'person',
          createdAt: new Date()
        }
      }
    })

    res.status(201).json({ success: true, content: responce.results })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message: 'person error' })
  }
}

export const searchMovie = async (req, res) => {
  const { query } = req.params
  try {
    const responce = await fetchTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
    if (responce.results.length === 0) {
      return res.status(401).json({ success: false, message: 'movie null' })
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: responce.results[0].id,
          image: responce.results[0].poster_path,
          title: responce.results[0].title,
          searchType: 'movie',
          createdAt: new Date()
        }
      }
    })
    res.status(201).json({ success: true, content: responce.results })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ success: false, message: 'movie error' })
  }
}

export const searchTv = async (req, res) => {
  const { query } = req.params
  try {
    const responce = await fetchTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
    if (responce.results.length === 0) {
      return res.status(401).json({ success: false, message: 'tv null' })
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: responce.results[0].id,
          image: responce.results[0].poster_path,
          title: responce.results[0].name,
          searchType: 'tv',
          createdAt: new Date()
        }
      }
    })
    res.status(201).json({ success: true, content: responce.results })
  } catch (error) {
    console.log(error)
  }
}

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: 'searchhistory error' })
  }
}

export const removeSearchHistory = async (req, res) => {
  let { id } = req.params
  id = parseInt(id)
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id
        }
      }
    })
    res.status(200).json({ success: true, message: "DELETE" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ success: false, message: 'removehistory error' })
  }
}