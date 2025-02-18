import React from 'react'
import { Editor } from './editor';
import { Toolbar } from './toolbar';

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  console.log(documentId)
  return (
    <div className='min-h-screen bg-[#FAFBFD]'>
      {/* Here I cannot pass the editor as prop to toolbar, so we are using zustand to create the editor store */}
      <Toolbar />
      <Editor />
    </div>
  )
}

export default DocumentIdPage
