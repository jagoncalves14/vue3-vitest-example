import axios from 'axios'
import getMovies from '@/api/get-movies/get-movies'
import { getMoviesMock } from '@/api/get-movies/__mocks__/get-movies'
import { API_URL } from '@/constants'

const axiosSpy = jest.spyOn(axios, 'get')
axiosSpy.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      results: getMoviesMock.results[0],
    },
  })
)

it('API: Get Movies List', async () => {
  const response = await getMovies()

  expect(axios.get).toBeCalledWith(
    `${API_URL}/discover/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&language=en-US&sort_by=popularity.desc`
  )
  expect(response).toEqual(getMoviesMock.results[0])
})
