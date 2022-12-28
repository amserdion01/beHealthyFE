import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ImGoogle } from "react-icons/im";

const LoginPage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <div>
          <Link href={"/"} >Go back</Link>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center bg-login-page bg-cover">
      <h1 className="p-14 text-center font-sans text-8xl text-white">LOGIN</h1>
      <button
        type="button"
        className="dark:focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#ffffff] px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-[#4285F4]/90 hover:text-white focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
        onClick={() => signIn("google")}
      >
        <ImGoogle className="mr-2 -ml-1 h-4 w-4 font-sans" />
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginPage;
