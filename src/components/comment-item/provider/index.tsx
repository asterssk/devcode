import { TComment } from "@/lib/types/comment";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import { commentReducer } from "./reducer";

type CommentContextType = {
  level: number;
  comment: TComment;
  upvote: () => void;
  downvote: () => void;
  reply: (content: string) => void;
  updateComment: (content: string) => void;
  deleteComment: () => void;

  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  isReplying: boolean;
  setIsReplying: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
};

const CommentContext = createContext<CommentContextType | null>(null);

export function CommentProvider({
  children,
  comment,
  level = 0,
}: {
  children: ReactNode;
  comment: TComment;
  level?: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(level <= 0);
  const [optimisticComment, updateOptimisticComment] = useOptimistic(
    comment,
    commentReducer
  );

  const upvoteComment = () => {
    updateOptimisticComment("UPVOTE");
  };

  const downvoteComment = () => {
    updateOptimisticComment("DOWNVOTE");
  };

  const replyComment = (content: string) => {
    updateOptimisticComment("DOWNVOTE");
  };

  const updateComment = (content: string) => {
    updateOptimisticComment("UPDATE");
  };

  const deleteComment = () => {
    updateOptimisticComment("DELETE");
  };

  const value = useMemo(
    () => ({
      comment: optimisticComment,
      upvote: upvoteComment,
      downvote: downvoteComment,
      reply: replyComment,
      updateComment: updateComment,
      deleteComment: deleteComment,
    }),
    [optimisticComment]
  );

  return (
    <CommentContext.Provider
      value={{
        ...value,
        level,
        isEditing,
        setIsEditing,
        isReplying,
        setIsReplying,
        isExpanded,
        setIsExpanded,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }

  return context;
}
