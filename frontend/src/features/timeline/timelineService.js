import axios from 'axios'

const API_URL = '/api/timeline/'

// Create new timeline
const createTimeline = async (timelineData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  console.log(timelineData)
  const response = await axios.post(API_URL, timelineData, config)

  console.log(response.data)
  return response.data
}

// Get timeline event
const getTimeline = async id => {
  const response = await axios.post(API_URL + 'getOne', id)
  console.log(response.data)
  return response.data
}

// update timeline event
const updateImgUrls = async data => {
  const { id, imgUrls } = data
  console.log(imgUrls)
  const response = await axios.patch(API_URL + `updateImgUrls/${id}`, {
    imgUrls
  })
  console.log(response.data)
  return
}

const timelineService = {
  createTimeline,
  getTimeline,
  updateImgUrls
}

export default timelineService
