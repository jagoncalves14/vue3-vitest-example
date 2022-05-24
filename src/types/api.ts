export type TMovieData = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type TMovieDetail = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: number
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    [key: string]: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
  }[]
  status: string
  tagline: string
  title: string
  video: false
  vote_average: number
  vote_count: number
}

export type TMoviePreview = {
  image: string
  title: string
  desc?: string
  overview: string
  budget?: string
}
