import "~/styles/globals.css";

import { Header } from "./header";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Header />
      <div className="h-full w-full bg-slate-100">
        <main className="mx-auto min-h-screen max-w-4xl border-x bg-white pt-14">
          {children}
        </main>
      </div>
    </div>
  );
}
