import { api } from "~/trpc/server";
import Link from "next/link";
import { levenshtein } from "~/lib/levenshtein";
import { boldenSubstring } from "~/lib/react_utils";

export default async function DefinitionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  const sWord = searchParams.word;
  if (!sWord || Array.isArray(sWord)) return <p>no bitches :(</p>;

  const words = await api.dictionary.list_words();

  if (!words) return <p>Add some words</p>;

  const wordsMatching = words
    .filter((word) => word.includes(sWord))
    .sort((a, b) => a.length - b.length)
    .slice(0, 10);

  const wordsDistancedSorted = (words ?? [])
    .map((word) => [word, levenshtein(sWord, word)] as const)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 10);

  return (
    <div className="p-2">
      <h1 className="text-3xl">Search results for {`"${sWord}"`}:</h1>
      {wordsMatching.length ? (
        <ul>
          {wordsMatching.map((suggestion) => (
            <li key={suggestion}>
              <Link
                href={"/definition?word=" + encodeURIComponent(suggestion)}
                className="italic text-blue-600 underline transition hover:text-blue-800"
              >
                {boldenSubstring(suggestion, sWord)}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Couldn{"'"}t find any words</p>
      )}
      <h2 className="text-2xl">Other words that may be similar:</h2>
      <ul>
        {wordsDistancedSorted.map(([word, distance]) => (
          <li className="flex flex-row items-center gap-2" key={word}>
            <Link
              href={"/definition?word=" + encodeURIComponent(word)}
              className="italic text-blue-600 underline transition hover:text-blue-800"
            >
              {word}
            </Link>
            <p className="text-sm text-neutral-500">(Difference: {distance})</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
