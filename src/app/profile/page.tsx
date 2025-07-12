'use client'

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import RecipeCreateForm from "@/entities/recipe/forms/createForm"
import ShowRecipes from "@/widgets/ShowRecipes"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { verifyToken } from "@/shared/utils/verifyToken"

type JwtPayload = {
  id?: string
}

const Page = () => {
  const [userId, setUserId] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token")

      if (storedToken) {
        try {

          const result = verifyToken(storedToken)

          if(!result){
            localStorage.removeItem('token')
            router.push('/login')
          }

          const decoded = jwtDecode<JwtPayload>(storedToken)
          const id = decoded.id
          setUserId(id ?? "")
        } catch (error) {
          setUserId("")
        }
      }
    }
  }, [])

  const onLogout = () => {
    localStorage.removeItem('token')
    router.push('/login')
  }

  return (
    <div className=" mx-auto md:flex md:justify-around md:mt-15">
        <div className="flex justify-center mt-5 md:block md:mt-0">
            <RecipeCreateForm userID={Number.parseInt(userId)}/>
        </div>
        <div className="flex justify-center mt-5 md:block md:mt-0">
            <ShowRecipes userID={Number.parseInt(userId)} isOwn={true} buttonText="Show your recipes" title="Yours reciepts"/>
        </div>
        <div className="flex justify-center mt-5 md:block md:mt-0">
            <ShowRecipes userID={Number.parseInt(userId)} isOwn={false} buttonText="Show others recipes" title="Reciepts of others"/>
        </div>
        <div className="flex justify-center mt-5 md:block md:mt-0 hover:underline active:scale-90">
          <Button onClick={onLogout}>Logout</Button>
        </div>
    </div>
  )
}

export default Page
