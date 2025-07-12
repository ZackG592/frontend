export interface ingredientProps {
    id:number,
    name:string,
    weightage:number,
    typeOfWeightage:string
}

const Ingredient:React.FC<ingredientProps> = ({id,name,weightage,typeOfWeightage}) => {
    return (
        <li key={id} className="flex justify-around items-center border border-gray-200 p-2 rounded-md">
          <div className="w-[60%] overflow-x-auto overflow-y-hidden">{name}</div>
          <div className="text-sm w-[20%] text-muted-foreground overflow-x-auto">
              {weightage} {typeOfWeightage}
          </div>
        </li>
    )
}

export default Ingredient