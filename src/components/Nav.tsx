import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const [showed, setShowed] = useState(false);

  const imgSize = 32;

  return (
    <header className="shadow-md border-none bg-[#23272a]">
      <nav className="text-2xl font-semibold content flex py-1">
        <Link href="/">
          <a className="ml-2 transition-colors duration-200 text-white hover:text-orange-600">
            <h1 className="text-2xl font-semibold flex flex-row py-2 items-center">
              <Image
                alt="Logo"
                src="/logo.png"
                width={imgSize}
                height={imgSize}
              />
              Terrakion
              <sup className="text-orange-600 ml-[0.15rem] text-xs">[BETA]</sup>
            </h1>
          </a>
        </Link>
        <span className="block order-2 ml-auto">
          {session ? (
            <>
              <img
                src={session.user?.image as string}
                alt="User image"
                className="absolute right-0 h-[2.8rem] mr-1 ml-10 mt-[0.15rem] rounded-full cursor-pointer"
                onClick={() => setShowed((prev) => !prev)}
              />
              <div
                className={`${
                  showed ? "absolute" : "hidden"
                } right-0 mt-16 mr-2 w-56 origin-top-right divide-y divide-gray-50 dark:divide-gray-500 bg-[#E3E5E8] dark:bg-[#23272a] rounded-md transition-all duration-200 text-sm`}
              >
                <div
                  className="py-2 text-gray-700 dark:text-white block px-4 font-regular"
                  role="none"
                >
                  <span className="font-light">Logged in as</span>
                  <br />
                  <span className="font-bold text-xl mt-2">
                    {session.user?.name}
                  </span>
                </div>
                <div className="py-1" role="none">
                  <Link href="/api/auth/signout">
                    <a className="text-white block px-4 py-2 transition-colors duration-200 hover:text-orange-600">
                      Logout
                    </a>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              type="button"
              className="text-xl mt-[0.35rem] mr-2 ml-10 px-3 py-1 transition-colors duration-200 rounded-md border-2 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
            >
              Login
            </button>
          )}
        </span>
      </nav>
    </header>
  );
}
