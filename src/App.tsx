import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Layout from '@/layouts/Layout'
import Search from '@/pages/Search'

const Favorites = lazy(() => import('@/pages/Favorites'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='/search' replace />} />
        <Route path='search' element={<Search />} />
        <Route
          path='favorites'
          element={
            <Suspense fallback={<>Loading...</>}>
              <Favorites />
            </Suspense>
          }
        />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
