import type { NextPage } from "next";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { FaUser } from "react-icons/fa";
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
      <nav className="flex items-center justify-between bg-green-900 p-8 opacity-50">
        <Link href="/">
          <IoMdArrowRoundBack className="h-12 w-12 " color="white" />
        </Link>
        <div className="flex flex-row space-x-8">
          <Link href="/favourites">
            <MdFavorite className="h-12 w-12 " color="white" />
          </Link>
          <Link href="/login">
            <FaUser className="h-12 w-12 " color="white"/>
          </Link>
        </div>
      </nav>
      <div>
        <h1 className="mx-auto mb-12 h-1 w-4/12 p-4 text-center text-6xl font-bold text-green-900">
          Add new cookbook
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center p-10"
        >
          <input
            type="text"
            className="focus:shadow-outline mb-8 appearance-none rounded border py-2 px-8 text-center text-3xl leading-tight text-gray-700 shadow focus:outline-none "
            placeholder="Cookbook Name"
            {...register("name", {})}
          />

          <div>
            <input
              className="my-5 rounded-full bg-[#2e612b] py-2 px-5 text-xl font-bold text-white opacity-90 hover:bg-black"
              type="submit"
            />
          </div>
        </form>
      </div>
      <div>
        <h1 className="mx-auto mb-10 mt-6 h-1 w-4/12 text-center text-6xl font-bold text-green-900">
          Your cookbooks
        </h1>
        <div className="mt-24">
          {cookbooks.data.map((cookbook, idx) => (
            <CookbookCard key={`${cookbook}_${idx}`} {...cookbook} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cookbooks;
