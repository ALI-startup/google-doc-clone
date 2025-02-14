// Layout doesn't rerender

import React from 'react'

interface DocumentLayoutProps {
    children: React.ReactNode
}

const AuthLayout = ({ children } : DocumentLayoutProps ) => {
  return ( 
    <div className="flex flex-col gap-y-4">
        <nav className='w-full bg-red-200'> Auth navbar </nav>
        { children }
    </div>
  )
}

export default AuthLayout
