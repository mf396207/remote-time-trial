import { useState, useReducer, useEffect } from 'react'

import PropTypes from 'prop-types'
import {
  MapContainer,
  TileLayer,
  Marker
} from 'react-leaflet'
import Dayjs from 'dayjs'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { generateIcon } from '../icons'
import reducer, { ActionTypes } from '../reducers'
import type { Checkpoint } from '../types'

import { ControlTypes } from '../components/Control'

interface Props {
  checkpoints: Checkpoint[]
  handleFinish: (time: string) => void
}

const Map: React.FunctionComponent<Props> = ({ checkpoints, handleFinish }) => {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([0, 0])
  const [elapsedTime, setElapsedTime] = useState('0')
  const [state, dispatch] = useReducer(reducer, { visitedCheckpoints: [] })

  const startTime = new Date().valueOf()

  /**
   * SUMMARY: Invoked whenever a users position changes.
   *
   * BEHAVIOUR:
   * - Updates the users position in state.
   * - If the user has reached a checkpoint then:
   *  - If the user has now visited every checkpoint, call handleFinish.
   *  - Else update the list of visited checkpoints to include the current checkpoint.
   *
   * @param position The current position of the users device.
   */
  const handlePositionUpdate = (position: GeolocationPosition): void => {
    setCurrentPosition([position.coords.latitude, position.coords.longitude])
  }

  useEffect(() => {
    /**
     * Tracks the elapsed time a user has been running for. Sets up a position watcher that allows us to listen for position changes in the app.
     *
     * Clears down timer and position watcher when this component dismounts.
     */
    const interval = setInterval(() => {
      const currentTime = new Date().valueOf()
      setElapsedTime(Dayjs(currentTime - startTime).format('mm:ss'))
    }, 1000)
    const positionWatcher = navigator.geolocation.watchPosition(handlePositionUpdate)
    return () => {
      clearInterval(interval)
      navigator.geolocation.clearWatch(positionWatcher)
    }
  }, [])

  /**
   * Check if a users new position is a checkpoint they have not previously visited and updates the list of visited checkpoints if so.
   */
  useEffect(() => {
    checkpoints.forEach((checkpoint) => {
      if (
        checkpoint.position[0] === currentPosition[0] &&
        checkpoint.position[1] === currentPosition[1] &&
        !state.visitedCheckpoints.includes(checkpoint.id)
      ) {
        dispatch({ type: ActionTypes.Visit, payload: checkpoint })
      }
    })
  }, [currentPosition])

  /**
   * Checks if a user has completed the course and calls handleFinish if they have.
   */
  useEffect(() => {
    if (state.visitedCheckpoints.length === checkpoints.length) {
      handleFinish(elapsedTime)
    }
  }, [state.visitedCheckpoints])

  return (
    <div style={{ height: '1000px', width: '100%' }}>
      <>
        <MapContainer
          center={checkpoints[0].position}
          zoom={14}
          scrollWheelZoom={true}
          style={{ height: '1000px', width: '100%' }}
        >
          <TileLayer
            url="http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {checkpoints.map((checkpoint) => {
            const visited = state.visitedCheckpoints.includes(checkpoint.id)
            if (checkpoint.isStart) {
              return (
                <Marker
                  position={checkpoint.position}
                  icon={generateIcon(ControlTypes.Start, visited)}
                  key={checkpoint.id}
                />
              )
            } else if (checkpoint.isFinish) {
              return (
                <Marker
                  position={checkpoint.position}
                  icon={generateIcon(ControlTypes.Finish, visited)}
                  key={checkpoint.id}
                />
              )
            } else {
              return (
                <Marker
                  position={checkpoint.position}
                  icon={generateIcon(ControlTypes.Control, visited)}
                  key={checkpoint.id}
                />
              )
            }
          })}
          <Marker position={currentPosition} />
        </MapContainer>
        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>
            <Typography variant="h4" sx={{ margin: 'auto' }}>Elapsed Time: {elapsedTime}</Typography>
          </Toolbar>
        </AppBar>
      </>
    </div>
  )
}

Map.propTypes = {
  checkpoints: PropTypes.array.isRequired,
  handleFinish: PropTypes.func.isRequired
}

export { Map }
