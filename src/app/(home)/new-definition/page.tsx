import { useFormStatus } from "react-dom";
import { api } from "~/trpc/server";
import { NewDefinitionForm } from "./form";

export default async function NewDefinitionPage() {
  return (
    <>
      <NewDefinitionForm />
    </>
  );
}
