import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  return (
    <div className="flex flex-col gap-2 p-8">
      <h1 className="text-3xl">Your personal Viossa Dictionary</h1>
      <hr />
      <h2 className="text-2xl">How does this work?</h2>
      <p>
        It is against the spirit of Viossa to have a centralized dictionary for
        all words, the solution to this, is that this dictionary starts out
        empty! Each person logs in with discord and has a unique dictionary for
        themselves.
      </p>
      <h2 className="text-2xl">Features/Todo list:</h2>
      <ul>
        <li className="flex flex-row gap-2">
          <input type="checkbox" disabled checked={true} />
          <p>Discord login</p>
        </li>
        <li className="flex flex-row gap-2">
          <input type="checkbox" disabled checked={true} />
          <p>Markdown support</p>
        </li>
        <li className="flex flex-row gap-2">
          <input type="checkbox" disabled checked={false} />
          <p>Importing word to definition file</p>
        </li>
        <li className="flex flex-row gap-2">
          <input type="checkbox" disabled checked={false} />
          <p>Share word list (not including definitions)</p>
        </li>
        <li className="flex flex-row gap-2">
          <input type="checkbox" disabled checked={false} />
          <p>Discord login</p>
        </li>
      </ul>

      <h2 className="text-2xl">Links:</h2>
      <Link
        className="text-blue-600 underline transition hover:text-blue-800"
        href="/new-definition"
      >
        Add new word
      </Link>
      <Link
        className="text-blue-600 underline transition hover:text-blue-800"
        href="/word-list"
      >
        Word list
      </Link>
    </div>
  );
}
