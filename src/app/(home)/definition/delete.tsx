"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export const DeleteButton = ({
  definition,
}: {
  definition: { word: string; definition?: string };
}) => {
  const deleteMutation = api.dictionary.delete_def.useMutation();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const utils = api.useUtils();
  const deleteThatShiiiii = async () => {
    setDeleting(true);
    const success = await deleteMutation.mutateAsync({ word: definition.word });
    if (success) {
      utils.dictionary.list_words.invalidate();
      router.push("/");
    }
    setDeleting(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button disabled={deleting} className="text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-trash-2"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1={10} y1={11} x2={10} y2={17} />
            <line x1={14} y1={11} x2={14} y2={17} />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={deleting}
            onClick={deleteThatShiiiii}
            className="rounded bg-red-600 text-white transition hover:bg-red-700"
          >
            Yes
          </button>
          <DialogClose asChild>
            <button
              disabled={deleting}
              className="rounded border border-neutral-600 transition hover:bg-neutral-300"
            >
              No
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
