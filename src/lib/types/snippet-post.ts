export type TVoteAction = "upvoted" | "downvoted" | "idle";

export type TSnippetPost = {
  id: string;
  username: string;
  title: string;
  vote_action: TVoteAction;
  author_name: string;
  author_avatar: string;
  content: string;
  date_posted: string;

  votes: number;
  voted_count: number;
  comments_count: number;
};
