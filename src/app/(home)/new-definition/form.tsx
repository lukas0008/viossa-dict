"use client";
import { useFormState, useFormStatus } from "react-dom";
import { api } from "~/trpc/server";
import { action } from "./form_actions";
import { useRouter } from "next/navigation";

export const NewDefinitionForm = () => {
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
  return (
    <form className="flex flex-col" action={formAction}>
      <label htmlFor="word">Word</label>
      <input
        required={true}
        name="word"
        className="rounded-md border border-black"
        id="word"
      />
      <label htmlFor="def">Definition</label>
      <textarea
        required={true}
        name="def"
        className="rounded-md border border-black"
        id="def"
      />
      <button disabled={pending} type="submit">
        Submit
      </button>
    </form>
  );
};
