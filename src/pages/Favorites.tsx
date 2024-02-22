import MovieCard from '@/components/MovieCard'
import MovieGrid from '@/components/MovieGrid'
import { useFavorites } from '@/utils/favoritesContext'

const Favorites: React.FC = () => {
  const favs = useFavorites()
  return (
    <MovieGrid>
      <>
        {favs.likedMovies.length === 0 ? (
          <p>No favorites yet!</p>
        ) : (
          favs.likedMovies.map((m) => <MovieCard key={m.imdbID} movie={m} />)
        )}
      </>
    </MovieGrid>
  )
}

export default Favorites
