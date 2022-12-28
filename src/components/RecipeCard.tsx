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
    <div className="grid grid-cols-3 bg-red-200">
      <div>{recipe.Author}</div>
      <div>{recipe.Name}</div>
      <div>
        <button onClick={() => deleteRecipe.mutate({ recipeID: recipe.ID })}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
