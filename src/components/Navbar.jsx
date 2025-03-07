import Link from 'next/link'
import React from 'react'
import UserButton from './UserButton'

export default function Navbar() {
  return (
    <div>
        <nav className='navbar shadow px-10'>
            <Link href={'/'} className='navbar-start'>
              <div className='flex items-center'>
                <img src="/favicon.png" className="size-15" />
                <h1 className='text-lg font-bold'>Euphoria No Sekai</h1>
              </div>
            </Link>
            
          <UserButton />
        </nav>
    </div>
  )
}
