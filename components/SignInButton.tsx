'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SignInButton() {
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', { callbackUrl: '/loggedin' })
      if (result?.error) {
        console.error('Sign-in error:', result.error)
      }
    } catch (error) {
      console.error('Sign-in error:', error)
    }
  }

  return (
    <Button onClick={handleSignIn}>
      Sign in with Google
    </Button>
  )
}
