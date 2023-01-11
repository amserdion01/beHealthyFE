import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { NextPage } from "next";
import { type ReactEventHandler, useRef, useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

import Link from "next/link";

import { AiOutlineClockCircle } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import type { RecipeType } from "../../types/recipe";
import Image from "next/image";
import { trpc } from "../../utils/trpc";
interface IParams extends ParsedUrlQuery {
  id: string;
}

const Recipe: NextPage<{ recipe: RecipeType }> = ({ recipe }) => {
  const favoriteUpdate = trpc.auth.updateFavorite.useMutation();
  const bookmarkUpdate = trpc.auth.updatBookmarked.useMutation();
  const recipeInfo = trpc.auth.isFavOrBookmarked.useQuery({
    recipeID: recipe.ID,
  });
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const div = useRef<HTMLDivElement | null>(null);
  const img = useRef<HTMLImageElement | null>(null);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [favorited, setFavorited] = useState<boolean>(false);
  useEffect(() => {
    if (recipeInfo.data) {
      setBookmarked(recipeInfo.data.bookmarked);
      setFavorited(recipeInfo.data.favorited);
    }
  }, [recipeInfo.data]);

  if (!recipeInfo.data) {
    return <div>Loading...</div>;
  }

  const setImgSize = () => {
    if (div && img) {
      if (img.current && div.current) {
        const ratio = img.current?.naturalHeight / img.current?.naturalWidth;
        const newHeight = img.current.naturalHeight * ratio;
        if (div.current.clientWidth) {
          setDimensions({
            height: newHeight,
            width: div.current.clientWidth,
          });
        }
      }
    }
  };
  const handleFavorite = () => {
    setFavorited(!favorited);
    favoriteUpdate.mutate({ id: recipe.ID, favorite: favorited });
  };

  const handleBookmarked = () => {
    setBookmarked(!bookmarked);
    bookmarkUpdate.mutate({ id: recipe.ID, bookmark: bookmarked });
  };
  const bookmark = bookmarked ? (
    <BsBookmarkFill size={"64px"} color="rgb(20,83,45)" />
  ) : (
    <BsBookmark size={"64px"} color="rgb(20,83,45)" />
  );
  const favorite = favorited ? (
    <MdFavorite size={"64px"} color="rgb(20,83,45)" />
  ) : (
    <MdFavoriteBorder size={"64px"} color="rgb(20 83 45)" />
  );

  const onImgLoad: ReactEventHandler<HTMLImageElement> = () => {
    setImgSize();
  };
  // useLayoutEffect(() => {

  //   window.addEventListener('resize', setImgSize);
  //   return () => window.removeEventListener('resize', setImgSize);
  // }, []);

  return (
    <div>
      <nav className="flex items-center justify-between bg-green-900 p-10 opacity-50">
        <Link href="/">
          <IoMdArrowRoundBack className="h-12 w-12 " color="white" />
        </Link>
        <div className="flex flex-row space-x-8">
          <Link href="/favourites">
            <MdFavorite className="h-12 w-12 " color="white" />
          </Link>
          <Link href="/cookbooks">
            <BsBook className="h-12 w-12 " color="white" />
          </Link>
          <Link href="/login">
            <FaUser className="h-12 w-12 " color="white" />
          </Link>
        </div>
      </nav>
      <div className="flex h-screen w-screen">
        <div className="relative flex w-3/5 flex-col items-center justify-evenly">
          <button
            className="absolute top-0 left-0 m-5"
            onClick={() => handleFavorite()}
          >
            {favorite}
          </button>
          <button
            className="absolute top-0 right-0 m-5"
            onClick={() => handleBookmarked()}
          >
            {bookmark}
          </button>
          <div>
            <div className="text-center text-6xl font-bold text-green-900">
              {recipe.Name}
            </div>
            <div className="mt-2 text-center text-xl text-[#7D8F69]">
              Author: {recipe.Author}
            </div>
          </div>
          <div className="flex w-full justify-evenly">
            <span className="text-center">
              <ImSpoonKnife size={"48px"} className="m-auto" />
              Portions: <br />
              {recipe.Portions}
            </span>
            <span className="text-center">
              <AiOutlineClockCircle size={"48px"} className="m-auto" />
              Cooking: <br />
              {recipe.Cooking} min
            </span>
            <span className="text-center">
              <AiOutlineClockCircle size={"48px"} className="m-auto" />
              Preparation:
              <br />
              {recipe.Preparation} min
            </span>
          </div>
          <hr className="bg-color-black w-11/12 border-black" />
          <div className="flex w-full justify-evenly">
            <div>
              <h2 className="text-2xl font-bold text-green-900">Ingredients</h2>
              <ul className="list-decimal">
                {recipe.Ingredients.split(",").map((ingredient, i) => {
                  return <li key={`ingredient_${i}`}> {ingredient}</li>;
                })}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-900">Tools</h2>
              <ul className="list-disc">
                {recipe.Tools.split(",").map((tool, i) => {
                  return <li key={`tool_${i}`}> {tool}</li>;
                })}
              </ul>
            </div>
          </div>
          <hr className="bg-color-black w-11/12 border-black" />
          <div className="">
            <h2 className="pb-4 text-center text-2xl font-bold text-green-900">
              Description
            </h2>
            <div className="mx-8">{recipe.Details}</div>
          </div>
        </div>
        <div ref={div} className="flex flex-col w-2/5 items-center justify-center">
          <Image
            src={recipe.ImageURL}
            width={dimensions.width*3/4}
            height={dimensions.height*2/3}
            alt="pic"
            priority
            ref={img}
            onLoad={onImgLoad}
          />
          <iframe className="relative mt-5 aspect-video "
            allowFullScreen  
            width={dimensions.width*3/4}        
            src={recipe.VideoURL}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  recipe: RecipeType;
}> = async (context) => {
  const API_URL = "https://www.be-healthy-uvt.live/v1/recipe";
  const { id } = context.params as IParams;
  const res = await fetch(`${API_URL}/${id}`);

  const recipe: RecipeType = await res.json();
  return {
    props: { recipe },
  };
};
export default Recipe;
