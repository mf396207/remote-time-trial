import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom'
import Grid from '@mui/material/Grid'

import { Homepage } from './pages/Homepage'
import { RacesPage } from './pages/RacesPage'
import { RacePage } from './pages/RacePage'

import { Header } from './components/Header'

export const App: React.FunctionComponent<{}> = () => {
  return (
    <Grid container spacing={2}>
      <Router>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/races" element={<RacesPage />} />
            <Route path="/race/:raceId" element={<RacePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Grid>
      </Router>
    </Grid>
  )
}
