import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Map } from '../components/Map'
import { useRaces } from '../hooks/useRaces'
import { type Race } from '../types'

export const RacePage: React.FunctionComponent<{}> = () => {
  const [finished, setFinished] = useState(false)
  const [finishTime, setFinishTime] = useState<string | null>(null)
  const [race, setRace] = useState<Race | undefined>(undefined)

  const { raceId } = useParams()

  const { races, loading } = useRaces()

  useEffect(() => {
    setRace((races.find((race) => race.id === raceId)))
  }, [loading, races])

  /**
   * SUMMARY: Invoked when a user finishes a race.
   *
   * @param time Denotes the time the user finishes the race in.
   */
  const handleFinish = (time: string): void => {
    setFinished(true)
    setFinishTime(time)
  }

  return (
    <>
      {
        race != null
          ? (
            <>
              {
                !finished
                  ? (
                    <>
                      <Typography variant="h3">{race.name}</Typography>
                      <Typography variant="h5">
                        Please make your way to the start. Your attempt will start automatically
                        when you reach it.
                      </Typography>
                      <Map checkpoints={race.checkpoints} handleFinish={handleFinish} />
                    </>
                    )
                  : (
                        <Typography>You finished in: {finishTime}</Typography>
                    )
              }
            </>)
          : (
              !loading && (<Typography variant="h3">Race does not exist.</Typography>)
            )
      }
    </>
  )
}
