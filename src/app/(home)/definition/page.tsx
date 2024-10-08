import { getServerAuthSession } from "~/server/auth";
import { SignedIn } from "../../_components/signed_in";
import { api } from "~/trpc/server";
import { SignedOut } from "../../_components/signed_out";

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
            <h1 className="text-4xl italic text-blue-900">{def.word}</h1>
            <hr />
            <h2 className="text-lg underline">Definition</h2>
            <div className="flex h-fit w-full flex-row gap-4">
              <div className="w-1 min-w-1 bg-neutral-200"></div>
              <p>{def.definition}</p>
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
