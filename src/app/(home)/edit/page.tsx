import { api } from "~/trpc/server";
import { EditForm } from "./form";

export default async function NewDefinitionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const startingWord =
    searchParams.word &&
    (Array.isArray(searchParams.word) ? undefined : searchParams.word);
  const def = startingWord
    ? await api.dictionary.get_def({ word: startingWord })
    : undefined;
  return (
    <>
      {startingWord && def && (
        <EditForm
          startingWord={startingWord}
          startingDefinition={def?.definition}
        />
      )}
    </>
  );
}
