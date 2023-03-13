import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

export const Homepage: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Typography>Click below to enter a race:</Typography>
      <Link to="/races">
        <Button variant="contained">Race List</Button>
      </Link>
    </>
  )
}
