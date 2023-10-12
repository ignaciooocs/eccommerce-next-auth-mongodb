import connectionDB from "@/libs/database"
import User from "@/models/user"
import { getServerSession } from "next-auth"

export default async function Profile () {
  const session = await getServerSession()
  if (!session) return <section>no estas iniciado</section>

  await connectionDB()

  const user = await User.findOne({ email: session.user?.email }).populate('cart')
  
  return (
    <section>
      <p>
        {user?.email}
      </p>
      <p>
        {user?._id}
      </p>
    </section>
  )
}