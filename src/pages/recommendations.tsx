import { type NextPage } from "next";
import { FaUser } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type RecipeType } from "../types/recipe";
import Image from "next/image";
interface RecipeProps {
  ID: string;
  Name: string;
  Details: string;
  ImageURL: string;
}

const API_URL = "http://backend.behealthy.svc.cluster.local:8888/v1/recipe"
const Recipe: React.FC<RecipeProps> = (recipe: RecipeProps) => {
  return (
    <div className="max-w-xs grow-0">
      <div className="relative h-72 w-72 rounded-md border-2 border-black">
        <Image
          fill
          src={recipe.ImageURL}
          alt="Pic"
          className="aspect-square rounded-md object-fill"
          />
      </div>
      <h2 className="break-words text-lg font-bold">{recipe.Name}</h2>
      <p className="break-words text-sm">{recipe.Details}</p>
      <Link href={`/recipe/${recipe.ID}`}>
        <button className="my-5 rounded-full bg-black py-4 px-7 text-xl font-bold text-white hover:bg-green-900">
          View
        </button>
      </Link>
    </div>
  );
};
const RecommendationsPage: NextPage = () => {
  const query = useQuery({
    queryKey: ["randomRecipes"],
    queryFn: () =>
      axios
        .get<RecipeType[]>(`${API_URL}/random/3`)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => console.log("api ", API_URL))
  });

  if (query.isLoading || query.isFetching || !query.data) {
    return <div>Loading </div>;
  }
  if (query.error instanceof Error) {
    return <div>{query.error.message}</div>;
  }
  return (
    <div className="font-sans">
      <div className="flex items-center justify-between p-10">
        <h2 className="text-5xl font-bold">Our recommendations</h2>
        <div className="flex flex-row space-x-8">
          <button
            type="button"
            className="dark:focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center rounded-full bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#67A07C]/50"
            onClick={() => query.refetch()}
          >
            <BiRefresh className="mr-2 -ml-1 h-8 w-8 font-sans" color="white" />
            Others
          </button>
          <FaUser className="h-12 w-12 " color="black" />
        </div>
      </div>
      <div className="flex flex-row items-center justify-evenly p-16 font-sans">
        {query.data.map((recipe, i) => (
          <Recipe key={i} {...recipe} />
        ))}
      </div>
    </div>
  );
};
export default RecommendationsPage;
