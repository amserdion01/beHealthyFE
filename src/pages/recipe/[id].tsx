import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RecipeType } from "../../types/recipe";
import Image from "next/image";
interface IParams extends ParsedUrlQuery {
  id: string;
}

const Recipe: NextPage<Data> = ({recipe}) => {
  useEffect(() => {
    console.log(recipe);
  }, []);

  return (
    <div className="h-screen bg-cover font-sans">
      <nav className="flex items-center justify-between bg-black p-8 opacity-50"></nav>
      <div className="flex items-center justify-between p-10">
        <div className="flex flex-row space-x-8">
          <AiOutlineStar className="h-8 w-8 " color="black"></AiOutlineStar>
          <BsBookmark className="h-8 w-8 " color="black"></BsBookmark>
        </div>
        {/* <img src={data.data.ImageURL} alt="Pic" className="object-fill rounded-md aspect-square max-w-lg" /> */}
        <Image
          src={recipe.ImageURL}
          priority={true}
          width="300"
          height="300"
          alt="recipe"
          className="aspect-square max-w-lg rounded-md object-fill"
        />
      </div>
      <p className="text-black">Recipe: {recipe.Author}</p>
    </div>
  );
};
interface Data {
  recipe: RecipeType
}
export const getServerSideProps: GetServerSideProps<{
  data: Data;
}> = async (context) => {
  const API_URL = "http://0.0.0.0:8080/v1/recipe";
  const { id } = context.params as IParams;
  const res = await fetch(`${API_URL}/${id}`);

  const recipe: RecipeType = await res.json();
  const data: Data = {recipe}
  return {
    props: data,
  };
};
export default Recipe;
