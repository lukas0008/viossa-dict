import { getServerAuthSession } from "~/server/auth";

export const SignedIn = async ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const session = await getServerAuthSession();

  return session == null ? <></> : <>{children}</>;
};
