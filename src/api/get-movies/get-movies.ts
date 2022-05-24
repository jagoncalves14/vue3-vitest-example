import axios, { AxiosResponse } from 'axios'
import { TMovieData } from '@/types/api'
import { API_URL } from '@/constants'

export default async function getMovies(): Promise<TMovieData[]> {
  const response: AxiosResponse = await axios.get(
    `${API_URL}/discover/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US&sort_by=popularity.desc`
  )
  return response.data.results
}
