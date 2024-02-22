import axios from 'axios'

const apiKey = '8e00c418'

const api = axios.create({
  baseURL: 'http://omdbapi.com',
  params: {
    apiKey,
  },
})

export const searchMovie = async (searchTerm: string, page: number = 1): Promise<SearchResponse> => {
  return api
    .get<SearchResponse>('/', {
      params: {
        s: searchTerm,
        type: 'movie',
        page,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export const getMovie = async (imdbID: string): Promise<MovieDetail> => {
  return api
    .get<MovieDetail>('/', {
      params: {
        i: imdbID,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

// types
export type Movie = {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export type SearchResponse = {
  Search: Movie[]
  totalResults: string
  Response: string
}

export type MovieDetail = {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  rest: unknown
}
