import axios from 'axios'
import getMovies from '@/api/get-movies'
import { getMoviesMock } from '@/api/__mocks__/get-movies'
import { API_URL } from '@/constants'

const axiosSpy = vi.spyOn(axios, 'get')
axiosSpy.mockImplementationOnce(() =>
  Promise.resolve({
    data: {
      results: getMoviesMock.results[0],
    },
  })
)

it('API: Get Movies List', async () => {
  const response = await getMovies()

  expect(axios.get).toBeCalledWith(API_URL)
  expect(response).toEqual(getMoviesMock.results[0])
})
