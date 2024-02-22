import { createContext, useContext, useState } from 'react'

import { Movie } from './axios'

type FavoritesContextType = {
  likedMovies: Movie[]
  addLikedMovie: (movie: Movie) => void
  removeLikedMovie: (imdbID: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>(() => {
    const storedLikedMovies = localStorage.getItem('likedMovies')
    return storedLikedMovies ? JSON.parse(storedLikedMovies) : []
  })

  const addLikedMovie = (movie: Movie) => {
    setLikedMovies((prevLikedMovies) => {
      const newLikedMovies = [...prevLikedMovies, movie]
      localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies))
      return newLikedMovies
    })
  }

  const removeLikedMovie = (imdbID: string) => {
    setLikedMovies((prevLikedMovies) => {
      const newLikedMovies = prevLikedMovies.filter((movie) => movie.imdbID !== imdbID)
      localStorage.setItem('likedMovies', JSON.stringify(newLikedMovies))
      return newLikedMovies
    })
  }

  return (
    <FavoritesContext.Provider value={{ likedMovies, addLikedMovie, removeLikedMovie }}>
      {p.children}
    </FavoritesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
