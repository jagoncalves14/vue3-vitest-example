export const getMovieDetailMock = {
  adult: false,
  backdrop_path: '/cqnVuxXe6vA7wfNWubak3x36DKJ.jpg',
  belongs_to_collection: null,
  budget: 70000000,
  genres: [
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 53,
      name: 'Thriller',
    },
  ],
  homepage: 'https://www.focusfeatures.com/the-northman',
  id: 639933,
  imdb_id: 'tt11138512',
  original_language: 'en',
  original_title: 'The Northman',
  overview:
    "Prince Amleth is on the verge of becoming a man when his father is brutally murdered by his uncle, who kidnaps the boy's mother. Two decades later, Amleth is now a Viking who's on a mission to save his mother, kill his uncle and avenge his father.",
  popularity: 8011.091,
  poster_path: '/zhLKlUaF1SEpO58ppHIAyENkwgw.jpg',
  production_companies: [
    {
      id: 10104,
      logo_path: '/hNuGhsKVlmhnwSRcmOejDBDjh6w.png',
      name: 'New Regency Pictures',
      origin_country: 'US',
    },
    {
      id: 10146,
      logo_path: '/xnFIOeq5cKw09kCWqV7foWDe4AA.png',
      name: 'Focus Features',
      origin_country: 'US',
    },
    {
      id: 10338,
      logo_path: '/el2ap6lvjcEDdbyJoB3oKiYgXu9.png',
      name: 'Perfect World Pictures',
      origin_country: 'CN',
    },
    {
      id: 123620,
      logo_path: null,
      name: 'Square Peg',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'CN',
      name: 'China',
    },
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2022-04-07',
  revenue: 63542000,
  runtime: 137,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
    {
      english_name: 'Icelandic',
      iso_639_1: 'is',
      name: 'Íslenska',
    },
  ],
  status: 'Released',
  tagline: 'Conquer your fate.',
  title: 'The Northman',
  video: false,
  vote_average: 7.5,
  vote_count: 1075,
}

export default vi.fn(() => Promise.resolve(getMovieDetailMock))
