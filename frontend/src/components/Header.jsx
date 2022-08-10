import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
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
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
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

const onSubmit = async e => {
  e.preventDefault()
  console.log(e)
}

export default function HideAppBar(props) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Hiking Timeline
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
                <form onSubmit={e => onSubmit(e)}>
                  <TextField
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    id='outlined-basic'
                    label='Username'
                    type='email'
                    variant='outlined'
                  />
                  <TextField
                    fullWidth
                    style={{ marginBottom: '10px' }}
                    id='outlined-password-input'
                    label='Password'
                    type='password'
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
