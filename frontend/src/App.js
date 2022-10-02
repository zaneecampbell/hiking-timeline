import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/Register'
import Create from './pages/Create'
import TimelineEvent from './pages/TimelineEvent'
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
          <div id='Top'>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />}></Route>
              <Route path='/create' element={<Create />}></Route>
              <Route
                path='/timelineEvent/:id'
                element={<TimelineEvent />}
              ></Route>
            </Routes>
          </div>
        </ThemeProvider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
