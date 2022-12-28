import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { NextPage } from "next";
import {
  type ReactEventHandler,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { AiOutlineStar, AiOutlineClockCircle } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import type { RecipeType } from "../../types/recipe";
import Image from "next/image";
interface IParams extends ParsedUrlQuery {
  id: string;
}

const Recipe: NextPage<{ recipe: RecipeType }> = ({ recipe }) => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const div = useRef<HTMLDivElement | null>(null);
  const img = useRef<HTMLImageElement | null>(null);
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
  const onImgLoad: ReactEventHandler<HTMLImageElement> = () => {
    setImgSize();
  };
  // useLayoutEffect(() => {

  //   window.addEventListener('resize', setImgSize);
  //   return () => window.removeEventListener('resize', setImgSize);
  // }, []);

  return (
    <div className="flex h-screen w-screen">
      <div className="flex w-3/5 flex-col items-center justify-evenly ">
        <div>
          <div className="">{recipe.Name}</div>
          <div>Author: {recipe.Author}</div>
        </div>
        <div className="flex w-full justify-evenly">
          <span className="text-center">
            <ImSpoonKnife size={"32px"} className="m-auto" />
            Portions: <br />
            {recipe.Portions}
          </span>
          <span className="text-center">
            <AiOutlineClockCircle size={"32px"} className="m-auto" />
            Cooking: <br />
            {recipe.Cooking} min
          </span>
          <span className="text-center">
            <AiOutlineClockCircle size={"32px"} className="m-auto" />
            Preparation:
            <br />
            {recipe.Preparation} min
          </span>
        </div>
        <hr className="bg-color-black w-11/12 border-black" />
        <div className="flex w-full justify-evenly">
          <div>
            Ingredients
            <ul className="list-decimal">
              {recipe.Ingredients.split(",").map((ingredient, i) => {
                return <li key={`ingredient_${i}`}> {ingredient}</li>;
              })}
            </ul>
          </div>
          <div>
            Tools
            <ul className="list-disc">
              {recipe.Tools.split(",").map((tool, i) => {
                return <li key={`tool_${i}`}> {tool}</li>;
              })}
            </ul>
          </div>
        </div>
        <hr className="bg-color-black w-11/12 border-black" />
        <div>
          Description
          <div>{recipe.Details}</div>
        </div>
      </div>
      <div ref={div} className="flex w-2/5 items-center justify-center">
        <Image
          src={recipe.ImageURL}
          width={dimensions.width}
          height={dimensions.height}
          alt="pic"
          priority
          ref={img}
          onLoad={onImgLoad}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<{
  recipe: RecipeType;
}> = async (context) => {
  const API_URL = "http://0.0.0.0:8080/v1/recipe";
  const { id } = context.params as IParams;
  const res = await fetch(`${API_URL}/${id}`);

  const recipe: RecipeType = await res.json();
  return {
    props: { recipe },
  };
};
export default Recipe;
