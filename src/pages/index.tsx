import { type NextPage } from "next";
import Image from "next/image";

const HomePage: NextPage = () =>{
    return(
        <div className="fixed w-screen h-screen">
            <Image
                className="relative z-0"
                src = {"/homeBG.png"}
                alt = ""
                fill = {true}
            />
            <h1 className="text-white text-3xl">Hi</h1>
        </div>
    )
}

export default HomePage