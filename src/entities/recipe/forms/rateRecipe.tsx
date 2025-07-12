import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { usePost } from "@/hooks/apiHooks/usePost";
import { SERVER_LINKS } from "@/shared/link/SERVER_LINKS";
import { useEffect, useState } from "react";

const RateRecipe: React.FC<{ userID: number; recipeID: number; rating?: number }> = ({
  userID,
  recipeID,
  rating,
}) => {
  const allowedRatings = [1, 2, 3, 4, 5];

  const {postData} = usePost(SERVER_LINKS.RECIPE.RATE);
  const [localRating,setLocalRating] = useState<string>()

  useEffect(() => {
    setLocalRating(rating?.toString())
  },[rating])

  const onSelect = (value: string) => {
    const numericRating = parseInt(value);
    setLocalRating(value)
    postData({ userID, recipeID, rating: numericRating });
  };

  return (
    <div className="flex items-center gap-4">
      <span>Choose rating:</span>
      <Select
        onValueChange={onSelect}
        value={localRating}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          {allowedRatings.map((item) => (
            <SelectItem key={item} value={item.toString()}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default RateRecipe;