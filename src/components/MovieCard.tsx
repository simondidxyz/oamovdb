import { StarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { Movie } from '@/utils/axios'
import { useFavorites } from '@/utils/favoritesContext'

import MovieDetail from './MovieDetail'

interface MovieCardProps {
  movie: Movie
}

const MovieCard: React.FC<MovieCardProps> = (p) => {
  const favs = useFavorites()
  const m = p.movie
  const isStarred = favs.likedMovies.some((lm) => lm.imdbID === m.imdbID)
  function handleStar(): void {
    if (isStarred) {
      favs.removeLikedMovie(m.imdbID)
    } else {
      favs.addLikedMovie(m)
    }
  }

  const [showDetail, setShowDetail] = useState(false)

  return (
    <>
      <div className='flex flex-col items-center justify-center max-w-44 space-y-2'>
        <img
          onClick={() => setShowDetail(true)}
          className='cursor-pointer w-44 h-64 shadow rounded-sm'
          src={m.Poster}
          alt={m.Title}
        />
        <div className='flex flex-row w-full space-x-2'>
          <button onClick={handleStar}>
            <StarIcon className={`${isStarred && 'fill-yellow-500 stroke-yellow-500'} h-6 w-6`} />
          </button>
          <div className='flex flex-col items-start justify-center overflow-hidden'>
            <p className='text-sm max-w-full truncate'>{m.Title}</p>
            <p className='text-xs'>{m.Year}</p>
          </div>
        </div>
      </div>
      <MovieDetail movie={m} show={showDetail} onClose={() => setShowDetail(false)} />
    </>
  )
}

export default MovieCard
