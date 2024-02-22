import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import MovieCard from '@/components/MovieCard'
import MovieCardSkeleton from '@/components/MovieCardSkeleton'
import MovieGrid from '@/components/MovieGrid'
import { useDebounceValue } from '@/hooks/useDebounceValue'
import { Movie, searchMovie } from '@/utils/axios'

const Search: React.FC = () => {
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalResults, setTotalResults] = useState('')
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState('')

  const debouncedSearch = useDebounceValue(search, 300)

  const performSearch = async (searchTerm: string, page: number = 1) => {
    setIsFetching(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    searchMovie(searchTerm, page)
      .then((response) => {
        setMovies(response.Search)
        setTotalResults(response.totalResults)
        setPage(page)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  useEffect(() => {
    debouncedSearch && performSearch(debouncedSearch)
  }, [debouncedSearch])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className='grid grid-cols-3 justify-between my-8'>
        <div />
        <div className='flex justify-center items-center'>
          <form className='min-w-full'>
            <label className='relative block'>
              <span className='sr-only'>Search</span>
              <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                <MagnifyingGlassIcon className='h-5 w-5 stroke-slate-300' />
              </span>
              <input
                className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm'
                placeholder='Search for a movie...'
                type='text'
                name='search'
                value={search}
                onChange={handleSearchChange}
              />
            </label>
          </form>
        </div>

        <div className='flex justify-end px-6 items-center'>
          {movies.length > 0 && (
            <>
              <button
                type='button'
                className='text-slate-500 disabled:text-slate-300 disabled:opacity-50'
                disabled={page < 2}
                onClick={() => performSearch(debouncedSearch, page - 1)}>
                Previous
              </button>
              <p className='mx-4'>
                {page * 10 < Number(totalResults) ? page * 10 : totalResults} of {totalResults}
              </p>
              <button
                type='button'
                className='text-slate-500'
                disabled={page >= Number(totalResults) % 10}
                onClick={() => performSearch(debouncedSearch, page + 1)}>
                Next
              </button>
            </>
          )}
        </div>
      </div>

      <MovieGrid>
        {search.length === 0 ? (
          <span>There is nothing...</span>
        ) : isFetching ? (
          <>
            {Array.from({ length: Math.random() * 6 + 3 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </>
        ) : error ? (
          <span>Ooops! An error occurred</span>
        ) : (
          <>
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.imdbID} />
            ))}
          </>
        )}
      </MovieGrid>
    </>
  )
}

export default Search
