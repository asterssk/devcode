import { CommentComponent } from "@/components/ui/comments";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  replies?: Comment[];
}

const sampleComments: Comment[] = [
  {
    id: "1",
    author: "Alice",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "This is a great post!",
    timestamp: "2 hours ago",
    replies: [
      {
        id: "2",
        author: "Bob",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I agree, very insightful.",
        timestamp: "1 hour ago",
        replies: [
          {
            id: "3",
            author: "Charlie",
            avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective...",
            timestamp: "30 minutes ago",
          },
          {
            id: "11",
            author: "Charlie Poot",
            avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective you shit...",
            timestamp: "30 minutes ago",
            replies: [
              {
                id: "3",
                author: "Charlie",
                avatar: "/placeholder.svg?height=40&width=40",
                content: "I have a different perspective...",
                timestamp: "30 minutes ago",
              },
            ],
          },
        ],
      },
      {
        id: "bbb",
        author: "Bob",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "I agree, very insightful.",
        timestamp: "1 hour ago",
        replies: [
          {
            id: "3",
            author: "Charlie",
            avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective...",
            timestamp: "30 minutes ago",
          },
          {
            id: "11",
            author: "Charlie Poot",
            avatar: "/placeholder.svg?height=40&width=40",
            content: "I have a different perspective you shit...",
            timestamp: "30 minutes ago",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    author: "David",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "Interesting points, but I'm not sure I agree with everything.",
    timestamp: "3 hours ago",
  },
];

export default function Page() {
  return (
    <div className="w-full flex flex-col gap-4">
      {sampleComments.map((comment) => (
        <CommentComponent key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
