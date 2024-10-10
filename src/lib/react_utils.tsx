export const boldenSubstring = (input: string, substring: string) => {
  const at = input.indexOf(input);
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
