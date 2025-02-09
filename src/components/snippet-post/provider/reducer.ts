import { TSnippetPost } from "@/lib/types/snippet";

type SnippetPostAction = "UPVOTE" | "DOWNVOTE";

function upvoteSnippetPost(post: TSnippetPost): TSnippetPost {
  return { ...post, vote_action: "upvoted", voted_count: post.votes + 1 };
}

function downvoteSnippetPost(post: TSnippetPost): TSnippetPost {
  return { ...post, vote_action: "downvoted", voted_count: post.votes - 1 };
}

function resetVotesSnippetPost(post: TSnippetPost): TSnippetPost {
  return { ...post, vote_action: "idle", voted_count: post.votes };
}

export function snippetPostReducer(
  state: TSnippetPost,
  action: SnippetPostAction
): TSnippetPost {
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
    default:
      return state;
  }
}
