import { type NextPage } from "next";
import Link from "next/link";
import { BsBook } from "react-icons/bs";
import {BiUser} from "react-icons/bi";

const HomePage: NextPage = () => {
    return (
        <div className="h-screen bg-cover bg-main-page font-sans">
            <nav className="p-8 bg-black opacity-50 flex items-center justify-between">
                <Link href="/cookbooks">
                    <BsBook className="w-12 h-12 " color="white" />
                </Link>
                <Link href="/login">
                    <BiUser className="w-12 h-12 " color="white" />
                </Link>
            </nav>
            <div className="flex flex-col items-center p-56">
                <p className="text-center text-white text-9xl">BeHealthy</p>
                <hr className="my-4 mx-auto w-4/12 h-1 bg-white rounded border-0 md:my-5 dark:bg-gray-700"></hr>
                <Link href="/recommendations">
                    <button className="bg-black hover:bg-green-900 text-white font-bold my-5 py-4 px-5 rounded-full text-2xl opacity-90">
                        Get inspired
                    </button>
                </Link>
            </div>
        </div >

    )
}

export default HomePage