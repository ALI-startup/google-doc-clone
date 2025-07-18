import React from 'react'
import { Editor } from './editor';
import { Toolbar } from './toolbar';
import NavBar from './navbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  console.log(documentId)
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      {/* Here I cannot pass the editor as prop to toolbar, so we are using zustand to create the editor store */}
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
        <NavBar />
        <Toolbar />
      </div>
      
      {/* A trick to get this 114px number is to hover by using the dev terminal.. and then it will show the pixel width and heignt of the hovered component */}
      <div className='pt-[114px] print:pt-0'>
        <Editor />
      </div>
    </div>
  )
}

export default DocumentIdPage
