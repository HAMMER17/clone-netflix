import express from 'express'
import { getCategoryMovie, getDetailsMovie, getSimilarMovie, getTraillersMovie, getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router()
router.get('/trending', getTrendingMovie)
router.get('/:id/trailers', getTraillersMovie)
router.get('/:id/details', getDetailsMovie)
router.get('/:id/similar', getSimilarMovie)
router.get('/:category', getCategoryMovie)

export default router;