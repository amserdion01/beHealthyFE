import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ImGoogle } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { BsBook } from "react-icons/bs";

const LoginPage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="font-sans">
        <nav className="bg-green-900 p-10 opacity-50 flex items-center justify-between">

          <Link href="/">
            <IoMdArrowRoundBack className="h-12 w-12 " color="white" />
          </Link>

          <div className="flex flex-row space-x-8">
            <Link href="/cookbooks">
              <BsBook className="h-12 w-12 " color="white" />
            </Link>
            <Link href="/favourites">
              <MdFavorite className="h-12 w-12 " color="white" />
            </Link>
          </div>
        </nav>
        <div className="mt-16 flex flex-col items-center justify-center">
          <>
            <h1 className="mt-8 text-4xl font-bold">
              {" "}
              You are signed in as: {session.user?.email}
            </h1>
            <div className="mt-16 flex flex-row items-center justify-center space-x-8">
              <button
                className="my-14 rounded-full bg-green-900 py-4 px-7 text-xl font-bold text-white shadow hover:bg-black"
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center bg-login-page bg-cover">
      <h1 className="p-32 text-center font-sans text-9xl text-white">LOGIN</h1>
      <button
        type="button"
        className="dark:focus:ring-[#4285F4]/55 mr-2 mb-2 mt-12 inline-flex items-center rounded-lg bg-[#ffffff] px-9 py-4 text-center text-m font-medium text-black hover:bg-[#4285F4]/90 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
        onClick={() => signIn("google")}
      >
        <ImGoogle className="mr-2 -ml-1 h-4 w-4 font-sans" />
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
