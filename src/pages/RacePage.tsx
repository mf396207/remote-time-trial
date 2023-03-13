import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Map } from '../components/Map'
import type { Race } from '../types'

export const RacePage: React.FunctionComponent<{}> = () => {
  const [finished, setFinished] = useState(false)
  const [finishTime, setFinishTime] = useState<string | null>(null)

  const { raceId } = useParams()

  const rows: Race[] = [
    {
      id: '1',
      name: 'Coledale Horseshoe',
      distance: '13 Miles',
      checkpoints: [
        {
          id: 1,
          position: [51.961238145355736, -3.204774894623032],
          isStart: true,
          isFinish: false
        },
        {
          id: 2,
          position: [51.96316057603814, -3.1431943999999996],
          isStart: false,
          isFinish: false
        },
        {
          id: 3,
          position: [51.96336101220235, -3.1965432331547943],
          isStart: false,
          isFinish: true
        }
      ]
    }
  ]

  const matchingRace = rows.find((race) => race.id === raceId)

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
        matchingRace != null
          ? (
            <>
              {
                !finished
                  ? (
                  <>
                    <Typography variant="h3">{matchingRace.name}</Typography>
                    <Typography variant="h5">
                      Please make your way to the start. Your attempt will start automatically
                      when you reach it.
                    </Typography>
                    <Map checkpoints={matchingRace.checkpoints} handleFinish={handleFinish} />
                  </>
                    )
                  : (
                  <Typography>Congrats on finishing in :{finishTime}</Typography>
                    )
              }
            </>)
          : (
            <Typography variant="h3">Race does not exist.</Typography>
            )
      }
    </>
  )
}
