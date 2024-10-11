"use client";
import { useFormState, useFormStatus } from "react-dom";
import { action } from "./form_actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DefinitionEditor } from "@components/definition_editor";
import { api } from "~/trpc/react";

export default function NewDefinitionPage() {
  const [state, formAction] = useFormState(action, {
    sigma: true,
    done: false,
    word: "sigma",
  });
  const router = useRouter();
  const { pending } = useFormStatus();
  if (state?.done && state.sigma) {
    router.push(
      "/definition?word=" + encodeURIComponent(state.word.toString()),
    );
  }
  const definitionText = useState("");
  const utils = api.useUtils();
  return (
    <form
      className="flex flex-col gap-2 p-2"
      onSubmit={() => {
        utils.dictionary.list_words.invalidate();
      }}
      action={formAction}
    >
      <label htmlFor="word">Word</label>
      <input required={true} name="word" className="border" id="word" />

      <DefinitionEditor definitionText={definitionText} />

      <button
        className="mx-auto w-fit rounded border px-2 py-1 transition hover:bg-neutral-200"
        disabled={pending}
        type="submit"
      >
        Submit
      </button>
      {state?.sigma || (
        <p className="text-3xl font-bold text-red-600">
          Failed to add definition
        </p>
      )}
    </form>
  );
}
