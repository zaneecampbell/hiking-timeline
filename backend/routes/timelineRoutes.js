const express = require('express')
const router = express.Router()
const { createTimeline } = require('../controllers/timelineController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', protect, createTimeline)

module.exports = router
