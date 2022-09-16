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
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'
import { v4 as uuidv4 } from 'uuid'
import { Typography } from '@mui/material'

// If timeline not found error message not displaying

function TimelineEvent() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { timeline, isLoading, isError, isSuccess, message, isGot } =
    useSelector(state => state.timeline)
  const { user } = useSelector(state => state.auth)

  const [formData, setFormData] = useState({ images: {} })

  const { id } = useParams()

  useEffect(() => {
    // If console goes nuts come back here
    if (isError) {
      toast.error(message)
    }

    const idData = { id }

    dispatch(clearSuccess())
    dispatch(getTimeline(idData))
  }, [isError])

  const { images } = formData

  if (!timeline) {
    return <>No timeline event found</>
  }

  if (!timeline.when && !timeline.where) {
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
  }

  const onImageUpload = async e => {
    e.preventDefault()

    if (images.length > 5) {
      toast.error('Please select up to 5 images')
      return
    }

    if (images.length === undefined) {
      toast.error('Please select at least 1 image')
      return
    }

    // Store image in firebase
    const storeImage = async image => {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${user._id}-${uuidv4()}`
        console.log(fileName)

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused')
                break
              case 'running':
                console.log('Upload is running')
                break
              default:
                break
            }
          },
          error => {
            reject(error)
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
              resolve(downloadURL)
            })
          }
        )
      })
    }

    const imgUrls = await Promise.all(
      [...images].map(image => storeImage(image))
    ).catch(() => {
      setLoading(false)
      toast.error('Images not uploaded')
      return
    })

    // reset input after upload
    setFormData(prevState => ({
      ...prevState,
      images: {}
    }))

    // got Imgurls time to put them in the timeline event mongoDB part
    console.log(imgUrls)
  }

  return (
    <div>
      {when} - {where}
      <form onSubmit={onImageUpload} noValidate>
        <Input
          style={{ display: 'none' }}
          id='images'
          label='Images'
          type='file'
          name='images'
          accept='jpg,.png,.jpeg'
          onChange={onMutate}
          inputProps={{ max: '5', multiple: true }}
          required
        />
        <label htmlFor='images'>
          <Button
            type='button'
            variant='contained'
            color='primary'
            component='span'
          >
            Select Images
          </Button>
          {images.length > 0 ? (
            <Typography component='span'>
              &nbsp;&nbsp;{images.length} images selected
              <br />
            </Typography>
          ) : (
            <div></div>
          )}
        </label>
        <br />
        <Button variant='contained' type='submit'>
          Upload
        </Button>
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
