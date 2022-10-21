import Document from "@/components/Document";
import Nav from "@/components/Nav";
import { trpc } from "@/utils/trpc";
import copy from "copy-to-clipboard";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCopy } from "react-icons/fa";
import { useRouter } from "next/router";

export default function CreateLink() {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    mutate: createLink,
    isSuccess,
    isLoading,
  } = trpc.useMutation(["links.create"]);

  const [slug, setSlug] = useState("");

  const { data: taken, refetch } = trpc.useQuery(
    ["links.check", { id: session?.user.id, slug }],
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const url = typeof window !== "undefined" ? window.location.origin : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  if (!session)
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

  if (isSuccess)
    return (
      <>
        <Document title="Dashboard" />
        <Nav />
        <div className="mt-5 flex flex-col justify-center items-center">
          <div className="flex flex-col bg-[#23272a] p-3 rounded-md">
            <div className="flex justify-center items-center">
              <span className="mr-2">{`${url}/${slug}`}</span>
              <button
                type="button"
                className="text-xl font-semibold transition-colors duration-200 text-white hover:text-orange-600"
                onClick={() => {
                  copy(`${url}/${slug}`);
                }}
              >
                <FaCopy className="inline" />
              </button>
            </div>
            <Link href="/dashboard">
              <button
                type="button"
                className="text-xl mt-5 font-semibold px-3 py-1 transition-colors duration-200 rounded-md border-2 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
              >
                Return to dashboard
              </button>
            </Link>
            <Link href="/dashboard">
              <button
                type="button"
                className="text-xl mt-5 font-semibold px-3 py-1 transition-colors duration-200 rounded-md border-2 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                onClick={() => router.reload()}
              >
                Create another link
              </button>
            </Link>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Document title="Dashboard" />
      <Nav />
      <div className="mt-5 w-screen flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit((data) => {
            createLink({
              id: session?.user.id || "",
              slug: data.slug,
              url: data.link,
            });
          })}
          className="grid grid-cols-1 bg-[#23272a] p-3 rounded-md"
        >
          {errors.slug?.type === "required" && (
            <span className="font-semibold text-center text-red-500">
              A slug is required.
            </span>
          )}
          {taken && (
            <span className="font-semibold text-center text-red-500">
              That slug is already taken.
            </span>
          )}
          <label className="flex items-center w-80 md:w-96">
            <span className="mr-2">{url}/</span>
            <input
              {...register("slug", { required: true })}
              type="text"
              className="mt-1 block w-full text-black focus:border-orange-600 focus:ring-orange-600"
              onChange={(e) => {
                setSlug(e.target.value);
                setTimeout(refetch, 100);
              }}
            />
          </label>
          {errors.link?.type === "required" && (
            <span className="mt-2 font-semibold text-center text-red-500">
              A link is required.
            </span>
          )}
          <label className="flex items-center w-80 md:w-96">
            <span className="mr-2">Link:</span>
            <input
              {...register("link", { required: true })}
              type="text"
              className="mt-1 block w-full text-black focus:border-orange-600 focus:ring-orange-600"
            />
          </label>
          <button
            type="submit"
            className="text-xl font-semibold mt-4 px-3 py-1 transition-colors duration-200 rounded-md border-2 text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
            disabled={taken}
          >
            {isLoading ? "Creating link..." : "Create Link"}
          </button>
        </form>
      </div>
    </>
  );
}
