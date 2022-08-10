import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#00813a'
    },
    secondary: {
      main: '#f50057'
    }
  }
})

function App() {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <div>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />}></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
    </>
  )
}

export default App
