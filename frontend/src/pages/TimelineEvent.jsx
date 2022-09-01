import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'

function TimelineEvent() {
  const dispatch = useDispatch()
  const { timeline } = useSelector(state => state.timeline)

  if (!timeline) {
    return <>No timeline event found</>
  }

  const { when, where } = timeline

  return (
    <div>
      {when} - {where}
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
