import { useState } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FaUser } from 'react-icons/fa'

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

const onSubmit = async e => {
  e.preventDefault()
  console.log(e)
}

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Box sx={style}>
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
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
            to='/register'
          >
            <Button variant='contained'>Register</Button>
          </Link>
        </form>
      </Box>
    </>
  )
}
export default Register
