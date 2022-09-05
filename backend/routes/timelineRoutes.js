const express = require('express')
const router = express.Router()
const {
  createTimeline,
  getTimeline
} = require('../controllers/timelineController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createTimeline)
router.get('/', getTimeline)

module.exports = router
