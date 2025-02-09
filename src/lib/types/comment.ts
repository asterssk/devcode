import { TVoteAction } from ".";

export type TComment = {
  id: string;
  username: string;
  author_avatar?: string;
  content: string;
  author_name: string;
  commented_at: string;

  vote_action: TVoteAction;
  votes: number;
  voted_count: number;

  replies?: TComment[];
};
