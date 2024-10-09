"use client";
import { useFormState, useFormStatus } from "react-dom";
import { api } from "~/trpc/server";
import { action } from "./form_actions";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Markdown from "react-markdown";

export const NewDefinitionForm = (props: {
  startingWord?: string;
  startingDefinition?: string;
}) => {
  const [state, formAction] = useFormState(action, {
    sigma: false,
    word: "sigma",
  });
  const router = useRouter();
  const { pending } = useFormStatus();
  if (state?.sigma) {
    router.push(
      "/definition?word=" + encodeURIComponent(state.word.toString()),
    );
  }
  const [preview, setPreview] = useState(false);
  const [definitionText, setDefinitionText] = useState(
    props.startingDefinition ?? "",
  );
  return (
    <form className="flex flex-col gap-2 p-2" action={formAction}>
      <label htmlFor="word">Word</label>
      <input
        required={true}
        name="word"
        className="border"
        defaultValue={props.startingWord}
        id="word"
      />
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
      <button
        className="mx-auto w-fit rounded border px-2 py-1 transition hover:bg-neutral-200"
        disabled={pending}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
