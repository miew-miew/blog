import BlogList from '@/components/BlogList'
import Featured from '@/components/Featured'
import React from 'react'

export default function Home() {
  return (
    <div className='min-h-screen px-13'>
      <Featured />
      <BlogList />
    </div>
  )
}
