import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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

function TimelineEvent() {
  const dispatch = useDispatch()
  const { timeline } = useSelector(state => state.timeline)

  const [formData, setFormData] = useState({ images: {} })

  const { id } = useParams()

  useEffect(() => {
    console.log(id)
  })

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
  }

  const onImageUpload = async e => {
    e.preventDefault()
  }

  return (
    <div>
      {when} - {where}
      <form>
        <TextField
          fullWidth
          style={{ marginBottom: '10px' }}
          id='images'
          label='Images'
          type='file'
          name='images'
          value={images}
          onChange={onImageUpload}
          multiple
        />
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
