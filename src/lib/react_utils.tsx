import type { useState } from "react";

export const boldenSubstring = (input: string, substring: string) => {
  const at = input.indexOf(substring);
  if (at === -1) return input;
  return (
    <>
      {input.substring(0, at)}
      <strong>{substring}</strong>
      {input.length - at - substring.length > 0 ? (
        input.substring(at + substring.length)
      ) : (
        <></>
      )}
    </>
  );
};

type NoUndefinedState<T> = T extends [
  infer S | undefined,
  React.Dispatch<React.SetStateAction<infer S | undefined>>,
]
  ? [S, React.Dispatch<React.SetStateAction<S>>]
  : never;

export type ReactStateType<T> = NoUndefinedState<
  ReturnType<typeof useState<T>>
>;
