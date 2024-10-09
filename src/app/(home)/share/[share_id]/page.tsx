import { useParams } from "next/navigation";
import { api } from "~/trpc/server";

export default async function SharePage({
  params: { share_id },
}: {
  params: { share_id: string };
}) {
  const words = await api.dictionary.list_shared_words({ code: share_id });

  return (
    <ul className="list-inside list-disc m-2">
      {words.map((word) => (
        <li>{word}</li>
      ))}
    </ul>
  );
}
