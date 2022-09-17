const asyncHandler = require('express-async-handler')

const Timeline = require('../models/timelineModel')

// @desc    Create a new timeline piece
// @route   /api/timeline
// @access  Private
const createTimeline = asyncHandler(async (req, res) => {
  const { when, where } = req.body

  // Validation
  if (!when || !where) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // Checks if that dates taken already
  const timelineExists = await Timeline.findOne({ when })

  if (timelineExists) {
    res.status(400)
    throw new Error('Date already taken!')
  }

  // Create timeline event
  const timeline = await Timeline.create({
    when,
    where
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

// Get Timeline by id route
const getTimeline = asyncHandler(async (req, res) => {
  const timeline = await Timeline.findById(req.body.id)

  // Validation
  if (!timeline) {
    res.status(400)
    throw new Error('Event not found')
  }

  res.send(timeline)
})

// Create an upload image urls function
const updateImgUrls = asyncHandler(async (req, res) => {
  const timeline = await Timeline.findById(req.body.id)

  if (!timeline) {
    res.status(404)
    throw new Error('Event not found')
  }

  const updatedTimeline = await Timeline.findByIdAndUpdate(
    req.body.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedTimeline)
})

module.exports = {
  createTimeline,
  getTimeline,
  updateImgUrls
}
