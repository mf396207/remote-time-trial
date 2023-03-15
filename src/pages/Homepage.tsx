import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export const Homepage: React.FunctionComponent<{}> = () => {
  return (
    <>
      <Link to="/races">
        <Button variant="contained" sx={{ width: '100%' }}>Show Races</Button>
      </Link>
    </>
  )
}
