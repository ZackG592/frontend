'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Ingredient, { ingredientProps } from "../ingridient/ingridient"
import RateRecipe from "./forms/rateRecipe"

interface UserLinks {
  rating:number
}

export interface RecipeProps {
    name:string,
    description:string,
    cookingInstruction:string
    ingredients: ingredientProps[]
    id:number
    currentUserId: number;
    userLinks: UserLinks[]
}

const Recipe: React.FC<RecipeProps> = ({ name, description, cookingInstruction, ingredients,id,currentUserId,userLinks }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-4">
      <Card className="rounded-2xl shadow-md">
    <CardHeader>
      <div className="max-h-20 overflow-auto">
        <div>Name:</div>
        <CardTitle className="text-l sm:text-xl font-bold break-words">
          {name}
        </CardTitle>
      </div>

      <div className="max-h-24 overflow-auto mt-5">
        <div>Description:</div>
        <p className="text-muted-foreground text-sm sm:text-base break-words mt-2">
          {description}
        </p>
      </div>
    </CardHeader>

        <CardContent className="pt-0">
          <h3 className="font-semibold mb-2 text-lg sm:text-xl">Ingredients</h3>
          <ScrollArea className="h-40 rounded-md border p-2 mb-4">
            <ul className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <Ingredient key={index} {...ingredient} />
              ))}
            </ul>
          </ScrollArea>

          <h3 className="font-semibold mb-2 text-lg sm:text-xl">Instructions</h3>
          <p className="text-sm sm:text-base leading-relaxed break-words">{cookingInstruction}</p>
          <div className="mt-5">
            <RateRecipe
            userID={currentUserId}
            recipeID={id}
            rating={userLinks[0]?.rating}
          />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recipe
