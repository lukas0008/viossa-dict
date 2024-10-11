"use server";
import { api } from "~/trpc/server";

export const action = async (_sigma: any, form: FormData) => {
  const startingWord = form.get("startingWord");
  const word = form.get("word");
  const def = form.get("def");

  if (
    typeof word != "string" ||
    typeof def != "string" ||
    typeof startingWord != "string"
  ) {
    return { sigma: false, word: "", done: true };
  }

  const isSigma = await api.dictionary.update_def({
    word: word.toString(),
    definition: def.toString(),
    startingWord: startingWord.toString(),
  });

  return { done: true, sigma: isSigma, word: word.toString() };
};
