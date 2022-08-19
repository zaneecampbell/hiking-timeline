import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'

// Edit this for Mobile position absolute nahhhhhhh
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

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in
    if (isSuccess && user) {
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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Box sx={style}>
        <Typography variant='h3' gutterBottom component='div'>
          <FaUser />
          &nbsp;Register
        </Typography>
        <form onSubmit={e => onSubmit(e)}>
          <TextField
            fullWidth
            style={{ marginBottom: '10px' }}
            id='email'
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            variant='outlined'
          />
          <TextField
            fullWidth
            style={{ marginBottom: '10px' }}
            id='name'
            label='Name'
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            variant='outlined'
          />
          <TextField
            fullWidth
            style={{ marginBottom: '10px' }}
            id='password'
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            autoComplete='current-password'
          />
          <TextField
            fullWidth
            style={{ marginBottom: '10px' }}
            id='password2'
            label='Confirm Password'
            type='password'
            name='password2'
            value={password2}
            onChange={onChange}
            autoComplete='current-password'
          />
          <Button variant='contained' type='submit'>
            Register
          </Button>
        </form>
      </Box>
    </>
  )
}
export default Register
