import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'
import PropTypes from 'prop-types'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Slide from '@mui/material/Slide'

// Login Modal style
const style = {
  marginTop: '256px',
  marginLeft: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  pb: 7
}

// Disappearing Header on scroll
function HideOnScroll(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
}

export default function HideAppBar(props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, message } = useSelector(
    state => state.auth
  )

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async e => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
                Hiking Timeline
              </Link>
            </Typography>
            <Button color='inherit' onClick={handleOpen}>
              <FaSignInAlt />
              &nbsp;Login
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography variant='h3' gutterBottom component='div'>
                  Login
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
                    id='password'
                    label='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    autoComplete='current-password'
                  />
                  <Button
                    style={{ float: 'left' }}
                    variant='contained'
                    type='submit'
                  >
                    Login
                  </Button>
                  <Link
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      float: 'right'
                    }}
                    onClick={handleClose}
                    to='/register'
                  >
                    <Button variant='contained'>or Register here</Button>
                  </Link>
                </form>
              </Box>
            </Modal>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to='/register'
            >
              <Button color='inherit'>
                <FaUser />
                &nbsp;Register
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  )
}
