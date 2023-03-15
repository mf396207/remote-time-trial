import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'

import { useRaces } from '../hooks/useRaces'

export const RacesPage: React.FunctionComponent<{}> = () => {
  const { races, loading } = useRaces()

  return (
    <>
      <Typography variant='h3'>Available Races</Typography>
      <Typography variant='subtitle2'>Your attempt will start as soon as you click on any race below.</Typography>
      <TableContainer component={Paper}>
        {!loading && (
          <Table sx={{ minWidth: 650 }} aria-label="races-table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Distance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {races.map((race) => (
                <TableRow
                  key={race.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    <Link to={`/race/${race.id}`}>{race.name}</Link>
                  </TableCell>
                  <TableCell>{race.distance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  )
}
