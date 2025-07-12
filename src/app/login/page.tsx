'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { usePost } from "@/hooks/apiHooks/usePost"
import useAuthRedirect from "@/hooks/useAuthRedirect"
import { SERVER_LINKS } from "@/shared/link/SERVER_LINKS"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const { isLoading } = useAuthRedirect()
  const router = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const { data, loading, error, postData } = usePost(SERVER_LINKS.AUTH.AUTHORIZATION)

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem('token', data.data.token)
      router.push('/profile')
    }
  }, [data, router])

  const onLogin = () => {
    postData({ name, password })
  }

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Enter password and name to login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row items-center sm:justify-between space-y-2 sm:space-y-0">
            <Button
              className="w-full sm:w-auto"
              variant="outline"
              onClick={onLogin}
            >
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <Link
              href={'/registration'}
              className="text-sm hover:underline"
            >
              Don't have an account yet? Create!
            </Link>
          </CardFooter>
          {error && (
            <div className="text-red-500 text-center p-2">
              {error.message || 'Login failed'}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Page
