import axios from 'axios'
import getMovieDetail from '@/api/get-movie-detail/get-movie-detail'
import { getMovieDetailMock } from '@/api/get-movie-detail/__mocks__/get-movie-detail'
import { API_URL } from '@/constants'

const axiosSpy = vi.spyOn(axios, 'get')
axiosSpy.mockImplementationOnce(() =>
  Promise.resolve({
    data: getMovieDetailMock,
  })
)

it('API: Get Movie Detail', async () => {
  const id = 123
  const response = await getMovieDetail(123)

  expect(axios.get).toBeCalledWith(`${API_URL}/movie/${id}?api_key=${import.meta.env.VITE_APP_API_KEY}`)
  expect(response).toEqual(getMovieDetailMock)
})
