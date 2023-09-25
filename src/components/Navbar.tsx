import Link from "next/link";
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options";
import ButtonLogout from "./buttons/ButtonLogout";
import ButtonAuth from "./buttons/ButtonAuth";

export default async function Navbar () {

  const session = await getServerSession(options)
  return (
    <nav>
      <ul className='p-4 flex gap-x-4'>
        <Link href='/'>Home</Link>
        {session 
          ? <ButtonLogout />
          : <ButtonAuth />
        }
      </ul>
    </nav>
  )
}