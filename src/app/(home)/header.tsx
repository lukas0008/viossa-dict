import { getServerAuthSession } from "~/server/auth";
import { SearchBar } from "./search";
import Link from "next/link";

export const Header = async () => {
  const session = await getServerAuthSession();
  return (
    <>
      <header className="fixed w-full">
        <div className="pointer-events-none absolute flex w-full flex-col items-center">
          <SearchBar />
        </div>
        <div className="flex h-14 flex-row items-center justify-between bg-blue-500 px-4 text-white">
          <Link className="transition hover:text-neutral-200" href="/">
            Home
          </Link>
          <Link
            className="transition hover:text-neutral-200"
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div>
      </header>
    </>
  );
};
