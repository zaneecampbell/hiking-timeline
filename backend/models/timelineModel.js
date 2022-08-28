const mongoose = require('mongoose')

const timelineSchema = mongoose.Schema(
  {
    when: {
      type: String,
      required: [true, 'When did this happen?'],
      unique: true
    },
    where: {
      type: String,
      required: [true, 'Where was this?']
    },
    imgUrls: {
      type: Array
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Timeline', timelineSchema)
