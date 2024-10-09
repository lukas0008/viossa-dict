import { api } from "~/trpc/server";
import { InputChecker } from "./input_checker";

export default async function SharePage({
  params: { share_id },
}: {
  params: { share_id: string };
}) {
  const words = await api.dictionary.list_shared_words({ code: share_id });

  return (
    <>
      <InputChecker words={words} />

      <ul className="m-2 list-inside list-disc">
        {words.map((word) => (
          <li>{word}</li>
        ))}
      </ul>
    </>
  );
}
