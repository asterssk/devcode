"use client";

import { TSnippetPost } from "@/lib/types/snippet-post";
import React, {
  createContext,
  useContext,
  useMemo,
  useOptimistic,
} from "react";
import { snippetPostReducer } from "./reducer";

type SnippetPostContextType = {
  snippet: TSnippetPost;
  urls: { user: string; post: string };
  upvote: () => void;
  downvote: () => void;
};

const SnippetPostContext = createContext<SnippetPostContextType | null>(null);

export function SnippetPostProvider({
  children,
  post,
}: {
  children: React.ReactNode;
  post: TSnippetPost;
}) {
  const [optimisticPost, updateOptimisticPost] = useOptimistic(
    post,
    snippetPostReducer
  );

  const upvotePost = () => {
    updateOptimisticPost("UPVOTE");
  };

  const downvotePost = () => {
    updateOptimisticPost("DOWNVOTE");
  };

  const value = useMemo(
    () => ({
      snippet: optimisticPost,
      urls: {
        user: `/u/${post?.username}`,
        post: `/s/${post?.username}/${post?.id}`,
      },
      upvote: upvotePost,
      downvote: downvotePost,
    }),
    [optimisticPost]
  );

  return (
    <SnippetPostContext.Provider value={value}>
      {children}
    </SnippetPostContext.Provider>
  );
}

export function useSnippetPost() {
  const context = useContext(SnippetPostContext);
  if (!context) {
    throw new Error("useSnippetPost must be used within a SnippetPostProvider");
  }

  return context;
}
