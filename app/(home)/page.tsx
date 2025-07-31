'use client'

import React from 'react'
import NavBar from './navbar'
import TemplateGallery from './template-gallery'
import { usePaginatedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import DocumentsTable from './documents-table'
import { useSearchParam } from '@/hooks/use-search-param'

const Home = () => {

  const [ search ] = useSearchParam();
  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, { search }, { initialNumItems: 5});


  return (
    <div className='min-h-screen flex flex-col'>
      <div className='fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4'>
        <NavBar />
      </div>
      <div className='mt-16'>
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  )
}

// Page and Layout must have default export
export default Home
