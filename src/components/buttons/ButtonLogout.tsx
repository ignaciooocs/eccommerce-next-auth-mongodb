'use client'
import {signOut} from 'next-auth/react'

export default function ButtonLogout () {
  return (
    <button 
      onClick={() => signOut()}
      className='p-4 bg-red-500 font-bold text-white font-sans rounded-md'
    >
      Logout
    </button>
  )
}