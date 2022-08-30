import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import timelineService from './timelineService'
import { extractErrorMessage } from '../../utils'

// NOTE: no need for isLoading, isSuccess, isError or message as we can leverage
// our AsyncThunkAction and get Promise reolved or rejected messages at
// component level
const initialState = {
  timelines: null,
  timeline: null
}

// Create new timeline event
export const createTimeline = createAsyncThunk(
  'timeline/create',
  async (timelineData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await timelineService.createTimeline(timelineData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  extraReducers: builder => {
    builder.addCase(createTimeline.fulfilled, (state, action) => {
      console.log('Success')
    })
  }
})

export default timelineSlice.reducer
