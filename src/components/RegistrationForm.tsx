'use client'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export default function RegistrationForm () {
  const [input, setinput] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const { name, email, username, password } = input

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setinput({ ...input, [name]: value})
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(input)
    }).then((res) => res.json())
    console.log(res)
  }
  return (
    <form className="p-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <input className='p-4 bg-slate-100 border-2' placeholder="name" name="name" value={name} onChange={handleChange} />
      <input className='p-4 bg-slate-100 border-2' placeholder="username" name="username" value={username} onChange={handleChange} />
      <input className='p-4 bg-slate-100 border-2' type="email" placeholder="email" name="email" value={email} onChange={handleChange} />
      <input className='p-4 bg-slate-100 border-2' type="password" placeholder="password" name="password" value={password} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  )
}
