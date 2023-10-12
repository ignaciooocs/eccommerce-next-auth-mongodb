import RegistrationForm from '@/components/RegistrationForm'
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function SignUp () {
  const session = await getServerSession()

  console.log(session)

  if (session) {
    redirect('/')
  }

  return (
    <section className='flex justify-center items-center'>
      <RegistrationForm />
    </section>
  )
}
