import { TVoteAction } from ".";

export type TSnippetPost = {
  id: string;
  username: string;
  title: string;
  author_name: string;
  author_avatar?: string;
  content: string;
  date_posted: string;

  vote_action: TVoteAction;
  votes: number;
  voted_count: number;
  comments_count: number;
};
