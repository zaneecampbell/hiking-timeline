import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  clearSuccess,
  clearError,
  getTimeline,
  reset
} from '../features/timeline/timelineSlice'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import { db } from '../firebase.config'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'
import { v4 as uuidv4 } from 'uuid'
import { Typography } from '@mui/material'

// If timeline not found error message not displaying

function TimelineEvent() {
  const dispatch = useDispatch()
  const { timeline, isLoading, isError, isSuccess, message, isGot } =
    useSelector(state => state.timeline)

  const [formData, setFormData] = useState({ images: {} })

  const { id } = useParams()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    const idData = { id }

    dispatch(clearSuccess())
    dispatch(getTimeline(idData))
  }, [])

  const { images } = formData

  if (!timeline) {
    return <>No timeline event found</>
  }

  const { when, where } = timeline

  const onMutate = e => {
    if (e.target.files) {
      setFormData(prevState => ({
        ...prevState,
        images: e.target.files
      }))
    }
    console.log(formData.images)
  }

  const onImageUpload = async e => {
    e.preventDefault()
    console.log(images)
  }

  return (
    <div>
      {when} - {where}
      <form>
        <input
          style={{ display: 'none' }}
          id='images'
          label='Images'
          type='file'
          name='images'
          accept='jpg,.png,.jpeg'
          onChange={onMutate}
          max='6'
          multiple
          required
        />
        <label htmlFor='images'>
          <Button variant='contained' color='primary' component='span'>
            Select Images
          </Button>
        </label>
        {images.length > 0 ? (
          <Typography>{images.length} images selected</Typography>
        ) : (
          <div></div>
        )}
        <Button onClick={onImageUpload}>Button</Button>
      </form>
    </div>
  )
}
export default TimelineEvent

// use id in params to fetch the timeline info (copy poll maybe useEffect)
// if there is no timeline info display so
// if the the timeline exists but there are no pictures say so
// if state.timeline = null display no event here or something?
// state.timeline when/where display for now will suffice
// also we need an upload images button and functionality
