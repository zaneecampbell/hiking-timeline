const express = require('express')
const router = express.Router()
const {
  createTimeline,
  getTimeline,
  updateImgUrls
} = require('../controllers/timelineController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createTimeline)
router.post('/getOne', getTimeline)
router.patch('/updateImgUrls', updateImgUrls)

module.exports = router
