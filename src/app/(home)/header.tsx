import { SearchBar } from "./search";
import Link from "next/link";
import { SignedIn } from "@components/signed_in";
import { SignedOut } from "@components/signed_out";
import styles from "./header.module.css";
import { ShareWords } from "./share_words";

export const Header = async () => {
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
          <SignedOut>
            <Link
              className="transition hover:text-neutral-200"
              href="/api/auth/signin"
            >
              Sign in
            </Link>
          </SignedOut>
          <SignedIn>
            <div className={styles.dropdownParent}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={
                  "feather feather-user aspect-square w-12 rounded-full bg-white p-2 text-black transition-all " +
                  styles.dropdownUnround
                }
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <div
                className={
                  styles.dropdownChild +
                  " absolute left-auto right-4 gap-2 rounded rounded-tr-none bg-white p-2 text-center text-black shadow-lg"
                }
              >
                <ShareWords />
                <hr />
                <div className="transition-transform hover:-rotate-12">
                  <Link
                    className="text-red-600 transition hover:text-red-700"
                    href="/api/auth/signout"
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          </SignedIn>
        </div>
      </header>
    </>
  );
};
