import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Link } from 'react-router-dom'

export const RacesPage: React.FunctionComponent<{}> = () => {
  const rows = [{ id: 1, name: 'Waun Fach', distance: '7 Miles' }]

  return (
    <>
      <Typography>Click on a race below to enter it immediately:</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="races-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Distance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <Link to={`/race/${row.id}`}>{row.name}</Link>
                </TableCell>
                <TableCell>{row.distance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
