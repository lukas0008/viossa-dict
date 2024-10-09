"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export const ShareWordsRefreshBox = (props: { initialCode?: string }) => {
  const [code, setCode] = useState(props.initialCode);
  const mutation = api.dictionary.gen_share_link.useMutation();

  const regenCode = async () => {
    setCode(await mutation.mutateAsync());
  };
  return (
    <div className="flex flex-row border border-neutral-600 bg-neutral-200 bg-opacity-80">
      <p className="w-full border-r border-neutral-600 text-neutral-800">
        {code
          ? `${document.location.origin}/share/${code}`
          : "You have never generated a code."}
      </p>
      <button className="h-full aspect-square" onClick={regenCode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          width={24}
          height={24}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-refresh-cw aspect-square mx-auto p-0.5 transition hover:rotate-[360deg]"
        >
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      </button>
    </div>
  );
};
