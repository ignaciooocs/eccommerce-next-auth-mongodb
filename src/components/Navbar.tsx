import Link from "next/link";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options";
import ButtonLogout from "./buttons/ButtonLogout";
import ButtonAuth from "./buttons/ButtonAuth";

export default async function Navbar () {

  const session = await getServerSession(options)
  return (
    <nav>
      <ul className='flex justify-between'>
        <section className="p-4 flex gap-x-4 items-center">
          <Link href='/'>Home</Link>
        </section>
        <section className="p-4 flex gap-x-4 items-center">
          <Link href='/products'>Productos 🛍</Link>
          <Link href='/cart'>Carrito 🛒</Link>
          <Link href='/transaction/create-webpay'>Webpay 🛒</Link>
          {session && <Link href='/profile'>Perfil 🙎‍♂️</Link>}
          {session 
            ? <ButtonLogout />
            : <ButtonAuth />
          }
        </section>
      </ul>
    </nav>
  )
}