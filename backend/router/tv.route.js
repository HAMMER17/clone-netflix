import express from 'express'
import { getCategoryTv, getDetailsTv, getSimilarTv, getTraillersTv, getTrendingTv } from '../controllers/tv.controller.js'

const router = express.Router()

router.get('/trending', getTrendingTv)
router.get('/:id/trailers', getTraillersTv)
router.get('/:id/details', getDetailsTv)
router.get('/:id/similar', getSimilarTv)
router.get('/:category', getCategoryTv)

export default router;