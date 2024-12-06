import React from 'react'

const RouteHeader = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex items-center justify-between gap-4'>
        <h2 className='text-lg font-semibold'>Split Ease</h2>
        {children}
    </div>
  )
}

export default RouteHeader
