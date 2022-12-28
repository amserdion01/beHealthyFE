import type { NextPage } from "next";
import React from "react";
import { trpc } from "../utils/trpc";
import { useForm, type SubmitHandler } from "react-hook-form";
import CookbookCard from "../components/CookbookCard";
type FormValues = {
  name: string;
};

const Cookbooks: NextPage = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const cookbooks = trpc.auth.getCookbooks.useQuery();
  const addMutation = trpc.auth.addCookbook.useMutation({
    onSuccess: () => cookbooks.refetch(),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    addMutation.mutate({ name: data.name });
  };
  if (!cookbooks.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        Add new cookbook
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="Name" {...register("name", {})} />

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
      <div>
        {cookbooks.data.map((cookbook, idx) => (
          <CookbookCard key={`${cookbook}_${idx}`} {...cookbook} />
        ))}
      </div>
    </div>
  );
};

export default Cookbooks;
