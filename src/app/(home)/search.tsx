"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useRef, useState } from "react";
import { api } from "~/trpc/react";

export const SearchBar = () => {
  const query = api.dictionary.list_words.useQuery();
  const router = useRouter();
  const text = useRef("");
  const [suggestions, setSuggestions] = useState<undefined | string[]>();
  const goSearch = async () => {
    const words = await query.promise;
    if (!words) return router.push("/definition?word=");

    if (words.includes(text.current)) {
      router.push("/definition?word=" + encodeURIComponent(text.current));
    } else {
      router.push("/search?word=" + encodeURIComponent(text.current));
    }
  };
  const onChange = async (t: ChangeEvent<HTMLInputElement>) => {
    text.current = t.target.value;

    if (text.current.length < 1) {
      setSuggestions(undefined);
      return;
    }

    const words = await query.promise;

    if (!words) return;

    setSuggestions(
      words
        .filter((word) => word.includes(text.current))
        .sort((a, b) => a.length - b.length)
        .slice(0, 5),
    );
  };

  const createBolded = (suggestion: string) => {
    const at = suggestion.indexOf(text.current);
    if (at === -1) return suggestion;
    return (
      <>
        {suggestion.substring(0, at)}
        <strong>{text.current}</strong>
        {suggestion.length - at - text.current.length > 0 ? (
          suggestion.substring(at + text.current.length)
        ) : (
          <></>
        )}
      </>
    );
  };
  return (
    <div className="pointer-events-auto mx-auto p-2">
      <div className="flex w-96 flex-row items-center rounded-xl bg-white pr-2">
        <input
          className="w-full rounded-l-xl p-1.5 hover:outline-none focus:outline-none"
          onChange={onChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              goSearch();
            }
          }}
          placeholder="Search here..."
        />
        <button onClick={goSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      {typeof suggestions != "undefined" ? (
        <div className="absolute flex w-96 flex-col border bg-white p-2 shadow">
          {suggestions.length ? (
            suggestions.map((suggestion) => (
              <Link
                key={suggestion}
                href={"/definition?word=" + encodeURIComponent(suggestion)}
              >
                {createBolded(suggestion)}
              </Link>
            ))
          ) : (
            <p>nothing found</p>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
