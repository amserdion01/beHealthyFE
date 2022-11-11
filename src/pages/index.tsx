import { type NextPage } from "next";

const HomePage: NextPage = () => {
    return (
        <div className="h-screen bg-cover bg-main-page">
            <nav className="p-8 bg-black opacity-50 flex items-center justify-between">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" opacity="100"  className="w-12 h-12 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" opacity="100" className="w-12 h-12">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
            </nav>  
            <div className="flex flex-col items-center p-36">
                <p className="text-center text-white text-8xl">BeHealthy</p>
                <hr className="my-4 mx-auto w-4/12 h-1 bg-white rounded border-0 md:my-5 dark:bg-gray-700"></hr>
                <button className="bg-black hover:bg-green-900 text-white font-bold my-5 py-4 px-5 rounded-full text-2xl">Get inspired</button>
            </div>
        </div>

    )
}

export default HomePage