import { type NextPage } from "next";
import { FaUser } from "react-icons/fa";
import { BiRefresh } from "react-icons/bi";
import Link from "next/link";

interface RecipeProps {
    id: string;
    title: string;
    img: string;
    desc: string;
}
const randomRecipes: RecipeProps[] = [
    {
        id: "1",
        title: "Ice cream",
        img: "Icecream.png",
        desc: "Tasty icecream"
    },
    {
        id: "2",
        title: "Ice cream",
        img: "Icecream.png",
        desc: "Tasty icecream"
    },
    {
        id: "3",
        title: "Ice cream",
        img: "Icecream.png",
        desc: "Tasty icecream"
    },

]
const Recipe: React.FC<RecipeProps> = (recipe: RecipeProps) => {
    return (
        <div className="grow-0 max-w-xs">
            <div className="border-2 rounded-md border-black w-72 h-72">
                <img src={recipe.img} alt="Pic" className="object-fill rounded-md aspect-square" />
            </div>
            <h2 className="font-bold break-words text-lg">{recipe.title}</h2>
            <p className="break-words text-sm">{recipe.desc}</p>
            <Link href={`/recipe/${recipe.id}`}>
                <button className="bg-black hover:bg-green-900 text-white font-bold my-5 py-4 px-7 rounded-full text-xl">View</button>
            </Link>
        </div>
    )
}
const RecommendationsPage: NextPage = () => {
    return (
        <div className="font-sans">
            <div className="flex items-center justify-between p-10">
                <h2 className="text-5xl font-bold">Our recommendations</h2>
                <div className="flex flex-row space-x-8">
                    <button type="button" className="text-white hover:bg-green-900 bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-[#67A07C]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                        <BiRefresh className="mr-2 -ml-1 w-8 h-8 font-sans" color="white" />
                        Others
                    </button>
                    <FaUser className="w-12 h-12 " color="black" />
                </div>
            </div>
            <div className="font-sans flex flex-row items-center justify-evenly p-16">
                {randomRecipes.map((recipe, i) => <Recipe {...recipe} />)}
            </div>
        </div>
    )
}
export default RecommendationsPage