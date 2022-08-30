import axios from 'axios'

const API_URL = '/api/timeline/'

// Create new timeline
const createTimeline = async (timelineData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, timelineData, config)

  return response.data
}

const timelineService = {
  createTimeline
}

export default timelineService
