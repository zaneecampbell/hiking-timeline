import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/timeline/timelineSlice'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { FaArrowAltCircleUp, FaHiking } from 'react-icons/fa'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'

function Home() {
  const [timelineData, setTimelineData] = useState({
    timeline: []
  })

  const { timeline } = timelineData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(reset())

    async function fetchTimeline() {
      try {
        const timelineGet = await axios.get('/api/timeline/')
        const timeline = timelineGet.data
        setTimelineData(prevState => ({
          ...prevState,
          timeline
        }))
      } catch (error) {
        toast.error('Unable to fetch timeline')
      }
    }

    fetchTimeline()
  }, [])

  const onClick = id => {
    navigate(`/timelineEvent/${id}`)
  }

  if (timeline.length < 1) {
    return <Spinner />
  }

  return (
    <div>
      <VerticalTimeline lineColor='#00813a'>
        {timeline.map((event, idx) => (
          <VerticalTimelineElement
            key={idx}
            date={event.when}
            iconStyle={{ background: `rgb(33, 150, 243)`, color: '#fff' }}
            icon={<FaHiking />}
          >
            <h1
              style={{ textAlign: 'center' }}
              className='vertical-timeline-element-title'
            >
              {event.where}
            </h1>
            {event.titleImg ? (
              <img
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'scale-down'
                }}
                src={`${event.titleImg}`}
                alt='Hike Title'
                loading='lazy'
              />
            ) : (
              <>Hike Title Image</>
            )}
            <Button
              style={{ width: '100%' }}
              variant='contained'
              onClick={() => onClick(event._id)}
            >
              View
            </Button>
          </VerticalTimelineElement>
        ))}
        {/* <VerticalTimelineElement
          className='vertical-timeline-element--education'
          date='2002 - 2006'
          iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
          icon={<FaHiking />}
        >
          <h3 className='vertical-timeline-element-title'>
            Bachelor of Science in Interactive Digital Media Visual Imaging
          </h3>
          <h4 className='vertical-timeline-element-subtitle'>
            Bachelor Degree
          </h4>
          <p>Creative Direction, Visual Design</p>
        </VerticalTimelineElement> */}
        <a style={{ width: '200px', height: '200px' }} href='#Top'>
          <VerticalTimelineElement
            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
            icon={<FaArrowAltCircleUp />}
          ></VerticalTimelineElement>
        </a>
      </VerticalTimeline>
    </div>
  )
}
export default Home
