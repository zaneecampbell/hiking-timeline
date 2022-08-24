import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate, Redirect } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'

// If not authenticated redirect to Home

const style = {
  marginTop: '256px',
  marginLeft: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function Create() {
  const [formData, setFormData] = useState({
    where: '',
    when: ''
  })

  const { where, when } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect if not logged in
    if (!user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = e => {
    e.preventDefault()

    if (!where || !when) {
      toast.error('Please add when and where')
    } else {
      const userData = {
        when,
        where
      }

      dispatch(Create(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Box sx={style}>
        <Typography variant='h3' gutterBottom component='div'>
          <FaPlus />
          &nbsp;Create
        </Typography>
        <form onSubmit={e => onSubmit(e)}>
          <TextField
            fullWidth
            style={{ marginBottom: '10px' }}
            id='where'
            label='Where'
            type='text'
            pl='where'
            value={where}
            onChange={onChange}
            variant='outlined'
          />
          <TextField
            fullWidth
            style={{ marginBottom: '10px' }}
            id='when'
            label='When'
            type='text'
            name='when'
            value={when}
            onChange={onChange}
            variant='outlined'
          />
          <Button variant='contained' type='submit'>
            Create
          </Button>
        </form>
      </Box>
    </>
  )
}
export default Create
