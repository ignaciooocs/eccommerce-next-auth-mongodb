'use client'
import Link from "next/link";

export default function ButtonAuth () {
  return (
    <>
      <Link href='/auth/sign-in'>Sign In</Link>
      <Link href='/auth/sign-up'>Sign Up</Link>
    </>
  )
}