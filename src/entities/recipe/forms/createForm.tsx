'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePost } from "@/hooks/apiHooks/usePost"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SERVER_LINKS } from "@/shared/link/SERVER_LINKS"

const weightageTypes = ["KG", "GR", "UNITS"] as const

type Ingredient = {
  name: string
  weightage: number
  typeOfWeightage: typeof weightageTypes[number]
}



 

const RecipeForm:React.FC<{userID:number}> = ({userID}) => {
  const [recipeName, setRecipeName] = useState("")
  const [description, setDescription] = useState("")
  const [instructions, setInstructions] = useState("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", weightage: 0, typeOfWeightage: "KG" },
  ])

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const newIngredients = [...ingredients]
    if (field === "weightage") {
      const val = value === "" ? "" : Number(value)
      newIngredients[index][field] = val as any
    } else {
      newIngredients[index][field] = value as any
    }
    setIngredients(newIngredients)
  }

  const {data,loading,error,postData} = usePost(SERVER_LINKS.RECIPE.CREATE)


  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", weightage: 0, typeOfWeightage: "KG" }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    const allIngredientsValid = ingredients.every((item, index) => {
      const valid =
        item.name.trim() !== "" &&
        item.weightage > 0 &&
        Number(item.weightage) > 0 &&
        item.typeOfWeightage

      if (!valid) {
        alert(`Be sure that everything are filled`)
      }

      return valid
    })

    if (!allIngredientsValid) return

    const recipeData = {
      name: recipeName,
      description:description,
      cookingInstruction:instructions,
      ingredients: ingredients.map(i => ({
        name: i.name.trim(),
        weightage: Number(i.weightage),
        typeOfWeightage: i.typeOfWeightage,
        userId:userID
      })),
    }

    postData({recipeData:recipeData,userID:userID})

    setRecipeName("")
    setDescription("")
    setInstructions("")
    setIngredients([{ name: "", weightage: 0, typeOfWeightage: "KG" }])
  }

  return (
  <div className="p-4 sm:p-6">
    <div>
      <label htmlFor="nameOfRecipe">Name of recipe</label>
      <Input
        className="mt-2 w-full"
        id="nameOfRecipe"
        value={recipeName}
        onChange={e => setRecipeName(e.target.value)}
      />
    </div>

    <div className="mt-5">
      <label htmlFor="description" className="block">
        Description of recipe
      </label>
      <textarea
        id="description"
        className="mt-2 w-full border border-gray-200 resize-none rounded-xl p-2 outline-none"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
    </div>

    <div className="mt-5">
      <label htmlFor="instructions" className="block">
        Cooking instructions
      </label>
      <textarea
        id="instructions"
        className="mt-2 w-full border border-gray-200 resize-none rounded-xl p-2 outline-none"
        value={instructions}
        onChange={e => setInstructions(e.target.value)}
      />
    </div>

    <div className="mt-8 max-h-72 overflow-y-auto">
      <h3 className="font-semibold mb-2">Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row gap-2 sm:items-center mb-4 border border-gray-300 rounded-md p-3"
        >
          <Input
            placeholder="Name"
            value={ingredient.name}
            onChange={e => handleIngredientChange(index, "name", e.target.value)}
            className="w-full"
          />
          <Input
            placeholder="Weight"
            type="number"
            min={0}
            value={ingredient.weightage === 0 ? 0 : ingredient.weightage}
            onChange={e => handleIngredientChange(index, "weightage", e.target.value)}
            className="w-full sm:w-40"
          />
          <select
            value={ingredient.typeOfWeightage}
            onChange={e => handleIngredientChange(index, "typeOfWeightage", e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-auto"
          >
            {weightageTypes.map(wt => (
              <option key={wt} value={wt}>
                {wt}
              </option>
            ))}
          </select>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeIngredient(index)}
            className="w-full sm:w-auto"
          >
            Remove
          </Button>
        </div>
      ))}
      <Button variant="outline" className="w-full sm:w-auto" onClick={addIngredient}>
        + Add Ingredient
      </Button>
    </div>

    <Button
      className="w-full sm:w-auto mt-6 cursor-pointer active:scale-95 hover:underline"
      onClick={handleSubmit}
    >
      Create it
    </Button>
  </div>
) 
}

const RecipeCreateForm:React.FC<{userID:number}> = ({userID}) => {
  return(
      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer active:scale-95 border border-black rounded-2xl p-2 bg-black text-white hover:underline">Create recipe</div>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            Create Recipe
          </DialogTitle>
          <RecipeForm userID={userID}/>
        </DialogContent>
      </Dialog>
  )
}

export default RecipeCreateForm