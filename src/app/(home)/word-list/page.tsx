import { ManagedPagination } from "@components/managed_pagination";
import Link from "next/link";
// import { ManagedPagination } from "@components/managed_pagination";

// import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function WordListPAge({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  // const hello = await api.post.hello({ text: "from tRPC" });
  const cPage = +(searchParams.page ?? 1) || 1;
  const session = await getServerAuthSession();
  const pages = await api.dictionary.def_pages();
  const pageData = await api.dictionary.list_defs({ page: cPage - 1 });
  // let hello = await api.dictionary.get_defs({ word: "hi" });
  console.log(pageData);
  // void api.post.getLatest.prefetch();

  return (
    <div className="flex flex-col">
      <Link className="font-semibold" href="/new-definition">
        Add +
      </Link>

      {(pageData ?? []).map((word) => (
        <Link
          className="italic text-blue-700 underline"
          href={"/definition?word=" + encodeURIComponent(word)}
          key={word}
        >
          {word}
        </Link>
      ))}

      <ManagedPagination page={cPage} pages={pages ?? 1} />
    </div>
  );
}
