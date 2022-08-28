const asyncHandler = require('express-async-handler')

const Timeline = require('../models/timelineModel')

// @desc    Register a new user
// @route   /api/users
// @access  Public
const createTimeline = asyncHandler(async (req, res) => {
  const { when, where, imgUrls } = req.body

  // Validation
  if (!when || !where || !imgUrls) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Create user
  const timeline = await Timeline.create({
    when,
    where,
    imgUrls
  })

  if (timeline) {
    res.status(201).json({
      _id: timeline._id,
      when: timeline.when,
      where: timeline.where,
      imgUrls: timeline.imgUrls
    })
  } else {
    res.status(400)
    throw new Error('Failed to create Timeline event')
  }
})

module.exports = {
  createTimeline
}
