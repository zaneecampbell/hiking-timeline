import { async } from '@firebase/util'
import { sliderClasses } from '@mui/material'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import timelineService from './timelineService'

const initialState = {
  timeline: null,
  isError: false,
  isSuccess: false,
  isGot: false,
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

// Get timeline event
export const getTimeline = createAsyncThunk(
  'timeline/getOne',
  async (id, thunkAPI) => {
    try {
      return await timelineService.getTimeline(id)
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

// Update timeline event with images
export const updateImgUrls = createAsyncThunk(
  'timeline/updateImgUrls/:id',
  async (data, thunkAPI) => {
    try {
      return await timelineService.updateImgUrls(data)
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
      state.isGot = false
      state.message = ''
    },
    clearSuccess: state => {
      state.isSuccess = false
    },
    clearGot: state => {
      state.isGot = false
    },
    clearError: state => {
      state.isError = false
      state.message = ''
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
      .addCase(getTimeline.pending, state => {
        state.isLoading = true
        state.isGot = false
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        state.isLoading = false
        state.isGot = true
        state.timeline = action.payload
      })
      .addCase(getTimeline.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset, clearSuccess, clearError } = timelineSlice.actions
export default timelineSlice.reducer
