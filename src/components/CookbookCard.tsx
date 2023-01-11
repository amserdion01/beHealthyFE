import { type SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeForm from "./RecipeForm";
interface CookbookCardProps {
  name: string;
  id: string;
}
type RecipeFormValues = {
  Name: string;
  Ingredients: string;
  Details: string;
  Preparation: number;
  Cooking: number;
  Portions: number;
  Tools: string;
  Images: FileList;
  VideoURL: string;
};
const readFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });
export type { RecipeFormValues };

const CookbookCard: React.FC<CookbookCardProps> = ({ name, id }) => {
  const recipes = trpc.auth.getCookbookRecipes.useQuery({ CookbookID: id });
  const [addForm, setAddForm] = useState<boolean>(false);
  const methods = useForm<RecipeFormValues>();
  const addRecipe = trpc.auth.addRecipe.useMutation({
    onSuccess: () => {
      recipes.refetch();
    },
  });
  const onSubmit: SubmitHandler<RecipeFormValues> = async (data) => {
    const image = data.Images.item(0);
    if (image) {
      const blob = await readFile(image);
      addRecipe.mutate({
        CookbookID: id,
        Image: {
          blob,
          name: image.name,
        },
        ...data,
      });
      setAddForm(false);
    }
  };

  if (!recipes.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" my-10 mx-40 rounded-lg border bg-[#7D8F69] p-4 text-center text-3xl text-white shadow-md sm:p-4">
      {name}
      <div className="mt-4 text-base text-black">
        {recipes.data.map((recipe) => {
          return <RecipeCard key={recipe.ID} {...recipe} />;
        })}
      </div>
      <div className=" mt-4 text-base">
        <button
          className="rounded-full bg-[#2e612b] p-2 text-xl  font-bold text-white opacity-80 hover:bg-black"
          onClick={() => setAddForm(true)}
        >
          Add recipe
        </button>
        {addForm && <RecipeForm onSubmit={onSubmit} methods={methods} />}
      </div>
    </div>
  );
};

export default CookbookCard;
