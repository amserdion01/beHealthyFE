import React from "react";
import { type RecipeType } from "../types/recipe";
import { trpc } from "../utils/trpc";

const RecipeCard: React.FC<RecipeType> = (recipe) => {
  const ctx = trpc.useContext();
  const deleteRecipe = trpc.auth.deleteRecipe.useMutation({
    onSuccess: async () => {
      await ctx.auth.invalidate();
    },
  });
  return (
    <div className="grid grid-cols-3 p-3 bg-[#becfae] mt-3">
      <div className="text-xl">{recipe.Author}</div>
      <div className="text-xl">{recipe.Name}</div>
      <div className="text-2xl text-green-800">
        <button onClick={() => deleteRecipe.mutate({ recipeID: recipe.ID })}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
