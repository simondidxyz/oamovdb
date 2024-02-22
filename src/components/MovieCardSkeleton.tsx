const MovieCardSkeleton: React.FC = () => {
  return (
    <div className='animate-pulse flex flex-col items-center justify-center w-44 space-y-2'>
      <div className='h-64 w-44 bg-slate-200 shadow rounded-sm'></div>
      <div className='flex flex-row w-full space-x-2'>
        <div>
          <div className='h-6 w-6 bg-slate-200 rounded-full' />
        </div>
        <div className='flex flex-col w-full space-y-2 items-start justify-center overflow-hidden'>
          <div className='h-2 bg-slate-200 rounded w-24'></div>
          <div className='h-2 bg-slate-200 rounded w-6'></div>
        </div>
      </div>
    </div>
  )
}

export default MovieCardSkeleton
