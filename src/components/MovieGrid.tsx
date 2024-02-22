const MovieGrid: React.FC<{ children: React.ReactElement }> = (p) => {
  return <div className='grid grid-cols-[repeat(auto-fill,11rem)] justify-around p-6 gap-6'>{p.children}</div>
}

export default MovieGrid
