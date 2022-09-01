import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import timelineService from './timelineService'

const initialState = {
  timeline: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new timeline event
export const createTimeline = createAsyncThunk(
  'timeline/create',
  async (timelineData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await timelineService.createTimeline(timelineData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
      state.timeline = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createTimeline.pending, state => {
        state.isLoading = true
      })
      .addCase(createTimeline.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.timeline = action.payload
      })
      .addCase(createTimeline.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = timelineSlice.actions
export default timelineSlice.reducer
