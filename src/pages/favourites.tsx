import { type NextPage } from "next";
import { FaUser } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type RecipeType } from "../types/recipe";
import Image from "next/image";
import { trpc } from "../utils/trpc";
interface RecipeProps {
    ID: string;
    Name: string;
    Details: string;
    ImageURL: string;
  }
  
  const API_URL = "https://www.be-healthy-uvt.live/v1/recipe";
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
        <p className="break-words truncate text-sm">{recipe.Details}</p>
        <Link href={`/recipe/${recipe.ID}`}>
          <button className="my-5 rounded-full bg-black py-4 px-7 text-xl font-bold text-white hover:bg-green-900">
            View
          </button>
        </Link>
      </div>
    );
  };
const FavouritesPage: NextPage = () => {
  const favourites = trpc.auth.getFavorites.useQuery()

  if (!favourites.data) {
    return <div>Loading ...</div>
  }
  return (
    <div className="font-sans">
      <nav className="flex items-center justify-between bg-green-900 p-10 opacity-50">
        <Link href="/">
          <IoMdArrowRoundBack className="h-12 w-12 " color="white" />
        </Link>
        <div className="flex flex-row space-x-8">
          <Link href="/cookbooks">
            <BsBook className="h-12 w-12 " color="white" />
          </Link>
          <Link href="/login">
            <FaUser className="h-12 w-12 " color="white" />
          </Link>
        </div>
      </nav>
      <div className="p-10">
        <h2 className="text-5xl font-bold text-green-900">
          Your favorite recepies
        </h2>
      </div>
      <div className="flex flex-row items-center justify-evenly p-16 font-sans">
        {favourites.data.map((recipe, i) => (
          <Recipe key={i} {...recipe} />
        ))}
      </div>
    </div>
  );
};
export default FavouritesPage;
