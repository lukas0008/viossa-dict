"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const SearchBar = () => {
  const router = useRouter();
  const text = useRef("");
  const go_search = () => {
    router.push("/definition?word=" + encodeURIComponent(text.current));
  };
  return (
    <div className="pointer-events-auto mx-auto p-2">
      <div className="flex w-fit flex-row items-center rounded-xl bg-white pr-2">
        <input
          className="w-full rounded-l-xl p-1.5 hover:outline-none focus:outline-none"
          onChange={(t) => (text.current = t.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              go_search();
            }
          }}
          placeholder="Search here..."
        />
        <button onClick={go_search}>
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
    </div>
  );
};
