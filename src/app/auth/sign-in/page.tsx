import { getServerSession} from 'next-auth/next'
import { redirect } from "next/navigation"
import ButtonGoogle from '@/components/buttons/ButtonGoogle'
import LoginForm from '@/components/LoginForm'

export default async function SignIn () {
  const session = await getServerSession()

  if (session) {
    redirect('/')
  }

  return (
    <section className="flex justify-center items-center">
      <LoginForm />
      <ButtonGoogle />
    </section>
  )
}
