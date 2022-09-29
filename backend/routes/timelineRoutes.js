const express = require('express')
const router = express.Router()
const {
  getTimelines,
  createTimeline,
  getTimeline,
  updateImgUrls
} = require('../controllers/timelineController')

const { protect } = require('../middleware/authMiddleware')

router.get('/', getTimelines)
router.post('/', protect, createTimeline)
router.post('/getOne', getTimeline)
router.patch(`/updateImgUrls/:id`, updateImgUrls)

module.exports = router
