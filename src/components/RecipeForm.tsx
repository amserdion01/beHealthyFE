import React from "react";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import { type RecipeFormValues } from "./CookbookCard";

interface RecipeFormProps {
  methods: UseFormReturn<RecipeFormValues, object>;
  onSubmit: SubmitHandler<RecipeFormValues>;
}
const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, methods }) => {
  const { handleSubmit, register } = methods;
  return (
    <div
      className="absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 transform
   bg-green-200"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" {...register("Name", {})} />
        <input
          type="text"
          placeholder="Ingredients"
          {...register("Ingredients", {})}
        />
        <input type="file" accept="image/*" {...register("Images", {})} />
        <input type="text" placeholder="Details" {...register("Details", {})} />
        <input
          type="number"
          placeholder="Portions"
          {...register("Portions", { valueAsNumber: true })}
        />
        <input
          type="number"
          placeholder="Preparation"
          {...register("Preparation", { valueAsNumber: true })}
        />
        <input
          type="number"
          placeholder="Cooking"
          {...register("Cooking", { valueAsNumber: true })}
        />
        <input type="text" placeholder="Tools" {...register("Tools", {})} />

        <input type="submit" />
      </form>
    </div>
  );
};

export default RecipeForm;
