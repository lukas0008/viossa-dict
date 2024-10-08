import { Component, FC } from "react";
import { getServerAuthSession } from "~/server/auth";

export const SignedOut = async ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const session = await getServerAuthSession();

  return session == null ? <>{children}</> : <></>;
};
