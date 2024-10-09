import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";
import { ShareWordsRefreshBox } from "./share_words_client";
import { api } from "~/trpc/server";

export const ShareWords = async () => {
  const initialCode = await api.dictionary.get_share_link();
  return (
    <Dialog>
      <DialogTrigger>Share word list</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Link for someone else to view your word list.
          </DialogTitle>
          <p className="text-sm text-neutral-600">
            This does not include your definitions
          </p>
        </DialogHeader>
        <ShareWordsRefreshBox initialCode={initialCode} />
      </DialogContent>
    </Dialog>
  );
};
