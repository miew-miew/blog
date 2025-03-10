import BlogList from '@/components/BlogList'
import Featured from '@/components/Featured'
import React from 'react'

export default function Home() {
  return (
    <div className='min-h-screen p-13 pt-0'>
      <Featured />
      <BlogList />
    </div>
  )
}
