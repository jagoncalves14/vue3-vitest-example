import axios, { AxiosResponse } from 'axios'
import { TMovieData } from '@/types/api'
import { API_URL } from '@/constants'

export default async function getMoviesList(): Promise<TMovieData[]> {
  const response: AxiosResponse = await axios.get(API_URL)
  return response.data.results
}
