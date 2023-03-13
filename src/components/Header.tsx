import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { Link } from 'react-router-dom'

export const Header: React.FunctionComponent<{}> = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', margin: 'auto', color: 'white' }}
          >
            Remote Time Trial
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  )
}
