"use server";
import { api } from "~/trpc/server";

export const action = async (sigma: any, form: FormData) => {
  const word = form.get("word");
  const def = form.get("def");
  if (!word) return;
  if (!def) return;

  await api.dictionary.post_def({
    word: word?.toString(),
    definition: def?.toString(),
  });

  return { sigma: true, word };
};
