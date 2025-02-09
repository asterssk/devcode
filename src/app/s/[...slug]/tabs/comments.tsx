import CommentItem from "@/components/comment-item";
import { CommentField } from "@/components/ui/comment-field";
import { TComment } from "@/lib/types/comment";
import { useState } from "react";

const sampleComments: TComment[] = [
  {
    id: "1",
    username: "",
    author_name: "Alice",
    author_avatar: "/placeholder.svg?height=40&width=40",
    content: "This is a great post!",
    vote_action: "upvoted",
    votes: 100,
    voted_count: 100,
    commented_at: "2 hours ago",
    replies: [
      {
        id: "2",
        username: "",
        author_name: "Bob",
        author_avatar: "/placeholder.svg?height=40&width=40",
        content: "I agree, very insightful.",
        vote_action: "idle",
        votes: 100,
        voted_count: 100,
        commented_at: "1 hour ago",
        replies: [
          {
            id: "3",
            username: "",
            author_name: "Charlie",
            author_avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective...",
            vote_action: "idle",
            votes: 100,
            voted_count: 100,
            commented_at: "30 minutes ago",
          },
          {
            id: "11",
            username: "",
            author_name: "Charlie Poot",
            author_avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective you shit...",
            vote_action: "idle",
            votes: 100,
            voted_count: 100,
            commented_at: "30 minutes ago",
            replies: [
              {
                id: "3",
                username: "",
                author_name: "Charlie",
                author_avatar: "/placeholder.svg?height=40&width=40",
                content: "I have a different perspective...",
                vote_action: "idle",
                votes: 100,
                voted_count: 100,
                commented_at: "30 minutes ago",
              },
            ],
          },
        ],
      },
      {
        id: "bbb",
        username: "",
        author_name: "Bob",
        author_avatar: "/placeholder.svg?height=40&width=40",
        content: "I agree, very insightful.",
        vote_action: "downvoted",
        votes: 100,
        voted_count: 100,
        commented_at: "1 hour ago",
        replies: [
          {
            id: "3",
            username: "",
            author_name: "Charlie",
            author_avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective...",
            vote_action: "idle",
            votes: 100,
            voted_count: 100,
            commented_at: "30 minutes ago",
          },
          {
            id: "11",
            username: "",
            author_name: "Charlie Poot",
            author_avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective you shit...",
            vote_action: "idle",
            votes: 100,
            voted_count: 100,
            commented_at: "30 minutes ago",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    username: "",
    author_name: "David",
    author_avatar: "/placeholder.svg?height=40&width=40",
    content: "Interesting points, but I'm not sure I agree with everything.",
    vote_action: "idle",
    votes: 100,
    voted_count: 100,
    commented_at: "3 hours ago",
  },
];

export function SnippetCommentsSection() {
  const [comments, setComments] = useState(sampleComments);

  return (
    <div className="w-full flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
