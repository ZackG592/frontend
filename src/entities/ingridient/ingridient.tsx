export interface ingredientProps {
    id:number,
    name:string,
    weightage:number,
    typeOfWeightage:string
}

const Ingredient:React.FC<ingredientProps> = ({id,name,weightage,typeOfWeightage}) => {
    return (
        <li
                  key={id}
                  className="flex justify-between items-center border border-gray-200 p-2 rounded-md"
                >
                  <span>{name}</span>
                  <span className="text-sm text-muted-foreground">
                    {weightage} {typeOfWeightage}
                  </span>
                </li>
    )
}

export default Ingredient