import Document from "@/components/Document";
import Nav from "@/components/Nav";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "@/utils/trpc";
import Loading from "@/components/Loading";
import copy from "copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useSession();

  const client = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["links.all", session?.user.id]);
  const { mutate: deleteSlug } = trpc.useMutation(["links.delete"], {
    onSuccess: () => client.invalidateQueries(["links.all"]),
  });

  const url = typeof window !== "undefined" ? window.location.origin : "";

  if (!session || !session.user)
    return (
      <div className="flex flex-col h-screen text-center justify-center items-center">
        <h1 className="text-5xl font-bold">Oops...</h1>
        <p className="mt-3">
          This page is only available for users that are logged in.
        </p>
        <button
          onClick={() => signIn()}
          type="button"
          className="text-xl font-semibold mt-[0.45rem] px-3 py-1 transition-colors duration-200 rounded-md border-2 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
        >
          Login
        </button>
      </div>
    );

  if (isLoading || !data) return <Loading />;

  return (
    <>
      <Document title="Dashboard" />
      <Nav />
      <div className="flex flex-row w-full justify-end text-xl">
        <div className="mx-5 mt-5 bg-[#23272a] px-2 py-1 rounded-md">
          <Link href="/dashboard/create">
            <AiOutlinePlus className="inline transition-colors duration-200 text-white hover:text-orange-600 cursor-pointer" />
          </Link>
        </div>
      </div>
      <ul className="mx-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((v) => (
          <li key={v.id} className="p-3 bg-[#23272a] rounded-md h-fit">
            <h1 className="font-bold text-lg">{url + `/${v.slug}`}</h1>
            <h2 className="font-light text-sm">{v.url}</h2>
            <p className="font-medium opacity-50 text-xs mt-2">
              {moment(v.createdAt).format("MMMM Do, YYYY hh:mm:ss A")}
            </p>
            <div className="flex flex-row w-full justify-end text-xl">
              <button
                type="button"
                className="font-semibold transition-colors duration-200 text-white hover:text-orange-600"
                onClick={() => copy(`${url}/${v.slug}`)}
              >
                <FaCopy className="inline" />
              </button>
              <button
                type="button"
                className="font-semibold transition-colors duration-200 text-white hover:text-orange-600"
                onClick={() => deleteSlug(v.id)}
              >
                <AiOutlineClose className="inline" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
