import axios, { AxiosResponse } from 'axios'
import { TMovieDetail } from '@/types/api'
import { API_URL } from '@/constants'

export default async function getMovieDetail(id: number): Promise<TMovieDetail> {
  const response: AxiosResponse = await axios.get(`${API_URL}/movie/${id}?api_key=${import.meta.env.VITE_APP_API_KEY}`)
  return response.data
}
