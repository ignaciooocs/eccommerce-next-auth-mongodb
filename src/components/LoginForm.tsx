'use client'

import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginForm () {
  const [error, seterror] = useState('')
  const [input, setinput] = useState({
    email: '',
    password: ''
  })

  const { email, password } = input

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setinput({ ...input, [name]: value})
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await signIn('credentials', {
      email, password, redirect: true
    })

    if (res?.error) return seterror(res.error)
  }

  return (
    <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      {error ? (<div className="text-red-500 font-bold">{error}</div>) : null}
      <input className='p-4 bg-slate-100 border-2' type="email" placeholder="email" name="email" value={email} onChange={handleChange} />
      <input className='p-4 bg-slate-100 border-2' type="password" placeholder="password" name="password" value={password} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  )
}