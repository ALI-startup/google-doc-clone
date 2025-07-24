import Link from 'next/link'
import React from 'react'
import NavBar from './navbar'

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <NavBar />
      </div>
      <div className='mt-16'>
        
      Click &nbsp;<Link href="/documents/123"><span className="text-blue-500 underline">here</span></Link>&nbsp; to go to document id
      </div>
    </div>
  )
}

// Page and Layout must have default export
export default Home
