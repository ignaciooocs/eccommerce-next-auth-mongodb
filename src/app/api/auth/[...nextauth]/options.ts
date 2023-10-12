import User from "@/models/user"
import connectionDB from "@/libs/database"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'

interface UserGoogle {
  id: string
  name: string
  email: string
  image: string
}

interface IAccount { provider: string }

interface Props { account: IAccount, user: UserGoogle }

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.ID_CLIENT_GOOGLE as string,
      clientSecret: process.env.SECRET_CLIENT_GOOGLE as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        }

        const res = await fetch("http://localhost:3000/api/auth/sign-in", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async signIn({ account, user }: Props) {
      if (account.provider === "google") {
        console.log(user, 'google')

        const { id: googleId, name, email, image } = user

        try {
          await connectionDB()
          const userFound = await User.findOne({ email })

          if (!userFound) {
            const res = await fetch('http://localhost:3000/api/auth/sign-up', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                googleId, name, email, image, username: googleId
              })
            })

          const data = await res.json()

          console.log(data, '\nuser saved')
        }
        } catch (error) {
          console.log('Error al registrar el usuario de google')
          throw error
        }
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
}