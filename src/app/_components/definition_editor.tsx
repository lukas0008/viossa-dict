import { useState } from "react";
import Markdown from "react-markdown";
import type { ReactStateType } from "~/lib/react_utils";

export const DefinitionEditor = ({
  definitionText: [definitionText, setDefinitionText],
}: {
  definitionText: ReactStateType<string>;
}) => {
  const [preview, setPreview] = useState(false);
  return (
    <>
      <label htmlFor="def">Definition</label>
      <div className="bg-neutral-100">
        <div className="flex flex-row">
          <button
            type="button"
            className={
              "w-24 border p-1 transition hover:bg-neutral-200 " +
              (preview || "bg-neutral-200")
            }
            onClick={() => setPreview(false)}
          >
            Write
          </button>

          <button
            type="button"
            className={
              "w-24 border px-2 py-1 transition hover:bg-neutral-200 " +
              (preview && "bg-neutral-200")
            }
            onClick={() => setPreview(true)}
          >
            Preview
          </button>
        </div>
        {preview ? (
          <div className="w-full border bg-white p-0.5">
            <Markdown className="prose">{definitionText}</Markdown>
          </div>
        ) : (
          <textarea
            required={true}
            name="def"
            className="block h-64 w-full border p-0.5 outline-none hover:outline-none focus:outline-none"
            id="def"
            value={definitionText}
            onChange={(e) => setDefinitionText(e.target.value)}
          />
        )}
      </div>
    </>
  );
};
