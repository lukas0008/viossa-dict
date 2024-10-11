import { SignedIn } from "../../_components/signed_in";
import { api } from "~/trpc/server";
import { SignedOut } from "../../_components/signed_out";
import Markdown from "react-markdown";
import Link from "next/link";
import { DeleteButton } from "./delete";

export default async function DefinitionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  // const session = await getServerAuthSession();

  // TODO
  if (!searchParams.word || Array.isArray(searchParams.word))
    return <p>no bitches :(</p>;

  const def = await api.dictionary.get_def({ word: searchParams.word });

  return (
    <>
      <SignedIn>
        {def ? (
          <div className="flex flex-col gap-2 p-6">
            <div className="flex flex-row justify-between">
              <h1 className="text-4xl italic text-blue-900">{def.word}</h1>
              <div className="flex flex-row items-center gap-2">
                <Link
                  href={"/new-definition?word=" + encodeURIComponent(def.word)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
                <DeleteButton definition={def} />
              </div>
            </div>
            <hr />
            <h2 className="text-lg underline">Definition</h2>
            <div className="flex h-fit w-full flex-row gap-4">
              <div className="w-1 min-w-1 bg-neutral-200"></div>
              <Markdown className="prose">{def.definition}</Markdown>
            </div>
          </div>
        ) : (
          <p>You have not defined this word</p>
        )}
      </SignedIn>
      <SignedOut>GO LOG IN AHHHHH</SignedOut>
    </>
  );
}
