import Document from "@/components/Document";
import { FiLogIn } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  else
    return {
      props: {},
    };
};

export default function Home() {
  const imgSize = 150;

  return (
    <>
      <Document />
      <div className="relative flex h-screen w-screen flex-col justify-between">
        <div className="flex grow flex-col items-center justify-center p-4">
          <Image src="/logo.png" width={imgSize} height={imgSize} />
          <div className="relative mb-2 text-6xl font-bold">
            Terrakion{" "}
            <sup className="absolute top-0 left-full text-xs text-orange-600">
              [BETA]
            </sup>
          </div>
          <div className="mb-5 text-center text-[1.100rem]">
            Creating short links{" "}
            <span className="font-semibold text-orange-600">
              could never be easier.
            </span>
          </div>
          <button
            onClick={() => signIn()}
            type="button"
            className="text-lg px-4 py-2 font-semibold transition-colors duration-200 rounded-md text-black bg-white hover:bg-neutral-200 flex items-center"
          >
            <FiLogIn className="mr-2" /> Login
          </button>
        </div>

        <div className="flex justify-between py-4 px-5 text-sm">
          <span>
            Made with &hearts; by{" "}
            <a
              href="https://github.com/Skripify"
              className="font-bold text-amber-500 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Skripify Labs
            </a>
          </span>
          <div className="flex gap-4">
            <a
              href="https://github.com/Skripify/Terrakion"
              className="font-bold text-orange-500 hover:underline flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="mr-1" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
