'use client'
import { signIn } from 'next-auth/react'

export default function ButtonGoogle () {
  return (
    <section>
      <button
        className='p-4 bg-blue-500 font-bold font-sans rounded-md text-white'
        onClick={() => signIn('google')}    
      >
        Iniciar sesión con google
      </button>
    </section>
  )
}