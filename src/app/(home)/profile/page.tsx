import { api } from "~/trpc/server";

export default async function ProfilePage() {
  const profile = await api.pageData.profile();
  if (!profile) return <p>Please sign in</p>;
  return (
    <>
      <p>Word count: {profile.wordCount}</p>
    </>
  );
}
