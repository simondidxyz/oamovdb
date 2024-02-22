import { FilmIcon, StarIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  return (
    <nav className='bg-white dark:bg-slate-800 w-full border-b border-gray-200 dark:border-gray-500'>
      <ul className='flex flex-row items-center justify-center space-x-8 max-w-7xl mx-auto p-4'>
        <li>
          <Link className='flex flex-row items-center text-lg font-bold' to='/search'>
            <FilmIcon className='h-6 w-6 mr-2' />
            <span className='max-sm:hidden'>Browse</span>
          </Link>
        </li>
        <li>
          <Link className='flex flex-row items-center text-lg font-bold' to='/favorites'>
            <StarIcon className='h-6 w-6 mr-2' />
            <span className='max-sm:hidden'>My Favorites</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
