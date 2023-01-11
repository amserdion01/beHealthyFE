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
      bg-[#8bab93] "
    >
      <form
        className=" items-center py-2 px-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="ml-3 mr-3 grid gap-4 grid-cols-2 grid-rows-1 ">
        <input
          className="focus:shadow-outline mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none "
          type="text"
          placeholder="Name"
          {...register("Name", {})}
        />
        <input
          type="text"
          className="focus:shadow-outline mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Ingredients"
          {...register("Ingredients", {})}
        />
        </div>
        <div className="ml-64 mr-64 grid gap-4 grid-cols-1 grid-rows-1">
        <input
          type="file"
          className="focus:shadow-outline mt-6 text-right appearance-none rounded border py-2 px-4 file:px-4 file:rounded file:bg-[#3C6255] file:text-white file:shadow text-xl leading-tight text-white shadow focus:outline-none"
          accept="image/*"
          {...register("Images", {})}
        /></div>
        <div className="ml-3 mr-3 grid gap-4 grid-cols-2 grid-rows-2">
        <input
          type="text"
          className="focus:shadow-outline mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Details"
          {...register("Details", {})}
        />
       <input
          type="text"
          className="focus:shadow-outline mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Video link"
          {...register("VideoURL", {})}
        />
        <input
          type="number"
          className="focus:shadow-outline mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Portions"
          {...register("Portions", { valueAsNumber: true })}
        />
        <input
          type="number"
          className="focus:shadow-outline mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Preparation"
          {...register("Preparation", { valueAsNumber: true })}
        />
        </div>
        <div className="mx-3 mt-6 grid gap-4 grid-cols-2 grid-rows-1">
        <input
          type="text"
          className="focus:shadow-outline w-full mb-6 mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Tools"
          {...register("Tools", {})}
        />
        <input
          type="number"
          className="focus:shadow-outline w-full mb-6 mt-6 appearance-none rounded border py-2 px-4 text-center text-xl leading-tight text-gray-700 shadow focus:outline-none"
          placeholder="Cooking"
          {...register("Cooking", { valueAsNumber: true })}
        />
        </div>
        <div>
        <input
          className="mt-3 mb-5 rounded-full bg-[#3C6255] py-2 px-5 text-xl font-bold shadow text-white opacity-90 hover:bg-black"
          type="submit"
        /></div> 
      </form>
    </div>
  );
};

export default RecipeForm;
