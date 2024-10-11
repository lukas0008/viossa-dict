"use client";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DefinitionEditor } from "@components/definition_editor";
import { api } from "~/trpc/react";
import { action } from "./form_actions";

export const EditForm = (props: {
  startingWord: string;
  startingDefinition?: string;
}) => {
  const [state, formAction] = useFormState(action, {
    sigma: false,
    word: "sigma",
    done: false,
  });
  const router = useRouter();
  const { pending } = useFormStatus();
  if (state && state.done && state.sigma) {
    router.push(
      "/definition?word=" + encodeURIComponent(state.word.toString()),
    );
  }
  const definitionText = useState(props.startingDefinition ?? "");
  const utils = api.useUtils();
  return (
    <form
      className="flex flex-col gap-2 p-2"
      onSubmit={() => {
        utils.dictionary.list_words.invalidate();
      }}
      action={formAction}
    >
      <h1 className="text-2xl">Editing word: {props.startingWord}</h1>
      <input
        hidden={true}
        value={props.startingWord}
        name="startingWord"
        id="startingWord"
      />
      <label htmlFor="word">Word</label>
      <input
        required={true}
        name="word"
        className="border"
        defaultValue={props.startingWord}
        id="word"
      />

      <DefinitionEditor definitionText={definitionText} />

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
