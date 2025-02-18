import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      Click &nbsp;<Link href="/documents/123"><span className="text-blue-500 underline">here</span></Link>&nbsp; to go to document id
    </div>
  )
}

// Page and Layout must have default export
export default Home
