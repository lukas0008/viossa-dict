"use client";

import { useState } from "react";
import Markdown from "react-markdown";

export const InputChecker = (props: { words: string[] }) => {
  const [input, setInput] = useState("");

  return (
    <div className="p-2">
      <p>Check if all words in the following sentance are in the dictionary:</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border hover:outline-none focus:outline-none"
      />

      <p>
        {input.split(" ").map((word) =>
          props.words.includes(word) ? (
            <>
              <span>{word}</span>{" "}
            </>
          ) : (
            <>
              <span className="bg-red-600 text-white">{word}</span>{" "}
            </>
          ),
        )}
      </p>
    </div>
  );
};
