import { TComment } from "@/lib/types/comment";

type CommentAction = "UPVOTE" | "DOWNVOTE" | "REPLY" | "UPDATE" | "DELETE";

function upvoteSnippetPost(post: TComment): TComment {
  return { ...post, vote_action: "upvoted", voted_count: post.votes + 1 };
}

function downvoteSnippetPost(post: TComment): TComment {
  return { ...post, vote_action: "downvoted", voted_count: post.votes - 1 };
}

function resetVotesSnippetPost(post: TComment): TComment {
  return { ...post, vote_action: "idle", voted_count: post.votes };
}

function replyComment(comment: TComment, content: string): TComment {
  return { ...comment };
}

export function commentReducer(
  state: TComment,
  action: CommentAction
): TComment {
  switch (action) {
    case "UPVOTE":
      if (state.vote_action !== "upvoted") {
        return upvoteSnippetPost(state);
      }
      return resetVotesSnippetPost(state);

    case "DOWNVOTE":
      if (state.vote_action !== "downvoted") {
        return downvoteSnippetPost(state);
      }
      return resetVotesSnippetPost(state);

    case "REPLY":
      if (state.vote_action !== "downvoted") {
        return downvoteSnippetPost(state);
      }
      return resetVotesSnippetPost(state);
    default:
      return state;
  }
}
