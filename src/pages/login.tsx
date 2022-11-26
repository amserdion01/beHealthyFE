import { type NextPage } from "next";
import {ImGoogle} from "react-icons/im";

const LoginPage: NextPage = () => {
    return (
        <div className="h-screen bg-cover bg-login-page flex flex-col items-center">
            <h1 className="text-center text-white text-8xl p-14 font-sans">LOGIN</h1>
            <button type="button" className="text-black bg-[#ffffff] hover:bg-[#4285F4]/90 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <ImGoogle className="mr-2 -ml-1 w-4 h-4 font-sans" />
                Sign in with Google
            </button>
        </div>

    )
}

export default LoginPage