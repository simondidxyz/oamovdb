import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import Search from '@/pages/Search'

test('renders Search component', () => {
  render(<Search />)

  expect(screen.getByText('Browse')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('There is nothing')).toBeInTheDocument()
})

test('handles search input', async () => {
  render(<Search />)

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    json: async () => ({ Search: [], totalResults: '0' }),
  } as Response)

  const searchInput = screen.getByPlaceholderText('Search for a movie...')
  fireEvent.change(searchInput, { target: { value: 'Batman' } })

  expect(searchInput).toHaveValue('Batman')

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('Batman'))
  })

  expect(screen.getByText('Batman')).toBeInTheDocument()
})
