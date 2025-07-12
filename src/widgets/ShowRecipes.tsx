'use client'

import { useEffect, useState, useMemo } from "react"
import debounce from 'lodash/debounce'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Recipe, { RecipeProps } from "@/entities/recipe/Recipe"
import { usePost } from "@/hooks/apiHooks/usePost"
import useAuthRedirect from "@/hooks/useAuthRedirect"
import { SERVER_LINKS } from "@/shared/link/SERVER_LINKS"

const ShowRecipes: React.FC<{
  userID: number
  isOwn: boolean
  buttonText: string
  title: string
}> = ({ userID, isOwn, buttonText, title }) => {
  const { error, loading, data, postData } = usePost(
    isOwn ? SERVER_LINKS.RECIPE.OWN : SERVER_LINKS.RECIPE.OTHERS
  );  
  const [name, setName] = useState("")

  const {isLoading:authLoading} = useAuthRedirect()


  const debouncedFetch = useMemo(() =>
    debounce((value: string) => {
      postData({ userID, name: value })
    },500), [userID]
  )

  useEffect(() => {
    debouncedFetch(name)
    return () => {
      debouncedFetch.cancel()
    }
  }, [name, debouncedFetch])

  const onFetch = () => {
    postData({ userID })
  }

  if(authLoading){
    return (<>Loading</>)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <div onClick={onFetch} className="cursor-pointer active:scale-95 border border-black rounded-2xl p-2 bg-black text-white hover:underline">
            {buttonText}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>

          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <div className="mb-4 px-4">
              <label htmlFor="name" className="block mb-2">Name of recipe</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name..."
              />
            </div>

            {data?.length > 0 && data.map((recipe: Omit<RecipeProps, 'currentUserId'>, index: number) => (
              <Recipe key={index} {...recipe} currentUserId={userID} />
            ))}

            {data?.length === 0 && (
              <div className="text-center text-lg text-muted-foreground mt-5">
                Looks like there's nothing to look at
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ShowRecipes
