import { useState, useEffect } from 'react'
import { type Race } from '../types'

/**
 * SUUMARY: Fetches a list of races from the API.
 *
 * @returns { races, loading } A list of races returned from the API (This is empty in the case where the request fails) and the status of the API request.
 */
export function useRaces (): { races: [Race] | [], loading: boolean } {
  const [races, setRaces] = useState<[Race] | []>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:3001/races')
      .then(async res => await res.json())
      .then(
        (result) => {
          setRaces(result)
          setLoading(false)
        },
        (error) => {
          console.error(error)
          setRaces([])
          setLoading(false)
        }
      )
  }, [])
  return { races, loading }
}
