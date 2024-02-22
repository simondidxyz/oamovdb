import { useEffect, useState } from 'react'

import { Movie, MovieDetail, getMovie } from '@/utils/axios'

interface MovieDetailProps {
  movie: Movie
  show: boolean
  onClose: () => void
}

const MovieDetail: React.FC<MovieDetailProps> = (p) => {
  const { movie, show, onClose } = p

  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null)

  useEffect(() => {
    getMovie(movie.imdbID)
      .then((response) => {
        setMovieDetail(response)
      })
      .catch((error) => {
        throw error
      })
  }, [movie])

  return (
    show && (
      <>
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300'>
            <div className='flex justify-between items-center border-b-2 border-gray-200 pb-4'>
              <h2 className='text-2xl font-semibold text-ellipsis overflow-hidden'>{movie.Title}</h2>
              <button onClick={onClose} className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='feather feather-x'>
                  <line x1='18' y1='6' x2='6' y2='18'></line>
                  <line x1='6' y1='6' x2='18' y2='18'></line>
                </svg>
              </button>
            </div>

            <div className='mt-6 space-y-4'>
              <img src={movie.Poster} alt={movie.Title} className='w-full h-96 object-cover rounded-lg' />
              <p className='text-lg text-gray-600'>{movieDetail?.Released}</p>
              <div className='flex flex-col space-y-4'>{movieDetail?.Genre}</div>
            </div>

            <div className='mt-6 text-sm text-gray-500'>
              <p>
                {movieDetail?.Director}
                {', '}
                {movieDetail?.Runtime}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default MovieDetail
